resource "kubernetes_service" "talk" {
  metadata {
    name      = "talk"
    namespace = "app"
  }

  spec {
    port {
      name        = "talk"
      protocol    = "TCP"
      port        = 80
      target_port = "http"
    }

    selector = {
      app = "talk"
    }
  }
}

resource "kubernetes_deployment" "talk" {
  metadata {
    name      = "talk"
    namespace = "app"
  }

  spec {
    # The server communicates with the client through a persistent SSE connection, which isn't shared among multiple replicas.
    # Avoid allocating more than a single replica if the Ingress / API gateway employs a round robin algorithm.
    # However, if the Ingress or API gateway employs an IP hash algorithm, such an allocation should pose no risk.
    replicas = 1

    selector {
      match_labels = {
        app = "talk"
      }
    }

    template {
      metadata {
        labels = {
          app = "talk"
        }
      }

      spec {
        container {
          name  = "talk"
          image = "proxoar/talk"

          port {
            name           = "http"
            container_port = 8000
          }
          # Remove me if not you're using a proxy
          env_from {
            config_map_ref {
              name = "talk-env"
            }
          }
          image_pull_policy = "Always"
          volume_mount {
            name       = "talk-config"
            read_only  = true
            mount_path = "/etc/talk"
          }
        }
        volume {
          name = "talk-config"
          config_map {
            name = "talk-config"
            items {
              key  = "talk.yaml"
              path = "talk.yaml"
            }
          }
        }
      }
    }

    strategy {
      type = "RollingUpdate"

      rolling_update {
        max_unavailable = "0"
        max_surge       = "1"
      }
    }
  }
}

resource "kubernetes_config_map" "talk_config" {
  metadata {
    name      = "talk-config"
    namespace = "app"
  }

  data = {
    "talk.yaml" = file("${path.module}/talk-config.yaml")
  }
}

resource "kubernetes_config_map" "talk_env" {
  metadata {
    name      = "talk-env"
    namespace = "app"
  }

  # Remove me if not you're using a proxy
  data = {
    HTTPS_PROXY = "http://vpn-service.vpn-namespace.svc.cluster.local:7890"
    NO_PROXY = "127.0.0.1/8, 192.168.0.0/16, 0.0.0.0, 193.168.0.0/24, 10.0.0.0/8, 17.0.0.0/8, 172.16.0.0/12, 100.64.0.0/10, localhost, *.local"
  }
}