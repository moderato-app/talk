package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

type Art struct {
	ImageUrl string
}

var wikiarts = []Art{
	{
		ImageUrl: "https://uploads8.wikiart.org/images/wassily-kandinsky/green-emptyness-1930.jpg",
	},
	{
		ImageUrl: "https://uploads8.wikiart.org/images/wassily-kandinsky/not_detected_189367.jpg",
	},
	{
		ImageUrl: "https://uploads1.wikiart.org/images/wassily-kandinsky/composition-viii-1923.jpg",
	},
	{
		ImageUrl: "https://uploads6.wikiart.org/alchemy-1947(2).jpg",
	},
	{
		ImageUrl: "https://uploads0.wikiart.org/images/jackson-pollock/number-17-1949.jpg",
	},
	{
		ImageUrl: "https://uploads4.wikiart.org/number-8-detail(1).jpg",
	},
	{
		ImageUrl: "https://uploads6.wikiart.org/full-fathom-five(1).jpg",
	},
	{
		ImageUrl: "https://uploads3.wikiart.org/00215/images/marina-abramovic/abramovic-breathing-in-breathing-out.jpg",
	},
	{
		ImageUrl: "https://uploads0.wikiart.org/00328/images/maximilien-luce/maximilien-luce-rue-ravignan-paris-98-289-museum-of-fine-arts-houston.jpg",
	},
	{
		ImageUrl: "https://uploads7.wikiart.org/00134/images/henri-matisse/sun-stree-1905.jpg",
	},
	{
		ImageUrl: "https://uploads0.wikiart.org/images/takashi-murakami/flowers-in-heaven-2010.jpg",
	},
	{
		ImageUrl: "https://uploads1.wikiart.org/images/yayoi-kusama/dots-2004.jpg",
	},
	{
		ImageUrl: "https://uploads4.wikiart.org/images/henri-edmond-cross/the-pink-cloud.jpg",
	},
	{
		ImageUrl: "https://uploads2.wikiart.org/images/theo-van-rysselberghe/moonlight-night-in-boulogne.jpg",
	},
	{
		ImageUrl: "https://uploads6.wikiart.org/images/balthus/nude-with-cat-1949.jpg",
	},
	{
		ImageUrl: "https://uploads7.wikiart.org/images/joan-miro/blue-iii.jpg",
	},
	{
		ImageUrl: "https://uploads3.wikiart.org/images/leonardo-da-vinci/study-of-a-woman-s-head.jpg",
	},
	{
		ImageUrl: "https://uploads8.wikiart.org/images/claude-monet/the-wheat-field.jpg",
	},
	{
		ImageUrl: "https://uploads5.wikiart.org/images/claude-monet/jeanne-marguerite-lecadre-in-the-garden.jpg",
	},
	{
		ImageUrl: "https://uploads7.wikiart.org/images/georges-seurat/study-for-the-channel-at-gravelines-evening-1890.jpg",
	},
	{
		ImageUrl: "https://uploads4.wikiart.org/images/georges-seurat/seated-bather-1883.jpg",
	},
	{
		ImageUrl: "https://uploads1.wikiart.org/images/wassily-kandinsky/red-wall-destiny-1909.jpg",
	},
	{
		ImageUrl: "https://uploads8.wikiart.org/images/wassily-kandinsky/night-1907.jpg",
	},
	{
		ImageUrl: "https://uploads0.wikiart.org/images/wassily-kandinsky/small-worlds-vii-1922.jpg",
	},
	{
		ImageUrl: "https://uploads0.wikiart.org/images/henri-rousseau/the-sleeping-gypsy-1897.jpg",
	},
	{
		ImageUrl: "https://uploads7.wikiart.org/images/claude-monet/the-green-wave.jpg",
	},
	{
		ImageUrl: "https://uploads4.wikiart.org/images/claude-monet/the-marina-at-argenteuil-1872.jpg",
	},
	{
		ImageUrl: "https://uploads5.wikiart.org/images/cy-twombly/returning-from-tonnicoda.jpg",
	},
	{
		ImageUrl: "https://uploads1.wikiart.org/images/cy-twombly/untitled-10.jpg",
	},
	{
		ImageUrl: "https://uploads8.wikiart.org/images/katsushika-hokusai/asakusa-honganji-temple-in-th-eastern-capital.jpg",
	},
	{
		ImageUrl: "https://uploads3.wikiart.org/images/henri-rousseau/the-mill.jpg",
	},
	{
		ImageUrl: "https://uploads3.wikiart.org/images/cindy-sherman/untitled-film-still-31-1979.jpg",
	},
	{
		ImageUrl: "https://uploads7.wikiart.org/images/leon-berkowitz/untitled-1975.jpg",
	},
	{
		ImageUrl: "https://uploads6.wikiart.org/images/alma-woodsey-thomas/air-view-of-a-spring-nursery-1966.jpg",
	},
	{
		ImageUrl: "https://uploads1.wikiart.org/images/alma-woodsey-thomas/iris-tulips-jonquils-and-crocuses-1969.jpg",
	},
	{
		ImageUrl: "https://uploads3.wikiart.org/images/alma-woodsey-thomas/earth-sermon-beauty-love-and-peace-1971.jpg",
	},
	{
		ImageUrl: "https://uploads0.wikiart.org/images/alma-woodsey-thomas/white-daisies-rhapsody-1973.jpg",
	},
	{
		ImageUrl: "https://uploads2.wikiart.org/images/alma-woodsey-thomas/oriental-garden-concerto-1976.jpg",
	},
	{
		ImageUrl: "https://uploads2.wikiart.org/images/alma-woodsey-thomas/red-azaleas-singing-and-dancing-rock-and-roll-music-1976.jpg",
	},
	{
		ImageUrl: "https://uploads3.wikiart.org/images/alma-woodsey-thomas/white-roses-sing-and-sing-1976.jpg",
	},
}

func main() {

	for _, art := range wikiarts {
		err := downloadImage(art.ImageUrl)
		if err != nil {
			fmt.Println("Error downloading image:", err)
		}
	}
}

func downloadImage(imageUrl string) error {

	path := "wikiart/" + strings.Split(imageUrl, "wikiart.org/")[1]

	// Create the directories if they don't exist
	err := os.MkdirAll(filepath.Dir(path), os.ModePerm)
	if err != nil {
		return err
	}

	stat, err := os.Stat(path)
	if err != nil && !os.IsNotExist(err) {
	}

	if err == nil && stat.Size() > 0 {
		fmt.Println("skipping file,", path)
		return nil
	}

	fmt.Println("downloading", path)

	// Create the image file
	file, err := os.Create(path)
	if err != nil {
		return err
	}
	defer file.Close()

	response, err := http.Get(imageUrl)
	if err != nil {
		return err
	}
	defer response.Body.Close()

	// Copy the image data to the file
	_, err = io.Copy(file, response.Body)
	if err != nil {
		return err
	}

	fmt.Println("Image downloaded:", path)
	return nil
}
