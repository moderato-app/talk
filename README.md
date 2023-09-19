<h1 align="center">
  <br>
  <img src="https://socialify.git.ci/proxoar/talk/image?description=1&name=1&owner=1&pattern=Diagonal%20Stripes&theme=Light" alt="Markdownify" width="500">
  <br>
</h1>

# Highlighted Features

- Focus on voice-driven dialogues
- Broad range of service providers to choose from
- Modern and stylish user interface
- User interaction primarily designed for desktop use
- Unified, standalone binary

# Roadmap

- [x] Google TTS
- [x] Google STT
- [x] OpenAI Whisper STT
- [x] Setting language, speed, stability, etc
- [x] Choose voice
- [x] Docker image
- [x] Server Side Events(SSE)
- [ ] More LLMs other than ChatGPT
- [ ] Download and import text history
- [x] Download chat MP3
- [ ] Prompt template

# Q&A

**Q: Why not use TypeScript for both the frontend and backend development?**

A:

* When I embarked on this project, I was largely inspired by [Hugh](https://github.com/IgnoranceAI/hugh), a project
  primarily coded in Python, supplemented with HTML and a touch of JavaScript. To broaden the horizons of text-to-speech
  providers, I revamped the backend logic using Go, transforming it into a Go-based project.
* Crafting backend logic with Go feels incredibly intuitive—it distills everything down to a single binary.
* Moreover, my skills in frontend development were somewhat rudimentary at that time.

**Q: Will a mobile browser-friendly version be made available?**

A: Streamlining the website for mobile usage would be a time-intensive endeavour and, given my current time constraints,
it isn't our primary concern. As it stands, the site performs optimally on desktop browsers based on the Chromium
Engine, with certain limitations on browsers such as Safari.

# Contributing

We're in the midst of a dynamic development stage for
this project and warmly invite new contributors.

# Credits

#### Front-end

* [React](https://github.com/facebook/react): The library for web and native user interfaces
* [vite](https://github.com/vitejs/vite): Next generation frontend tooling. It's fast!
* [valtio](https://github.com/pmndrs/valtio): Valtio makes proxy-state simple for React and Vanilla
* [wavesurfer.js](https://github.com/katspaugh/wavesurfer.js): Audio waveform player
* [granim.js](https://github.com/sarcadass/granim.js): Create fluid and interactive gradient animations with this small
  javascript library.
* [Signal-Desktop](https://github.com/signalapp/Signal-Desktop)
  and [Signal-iOS](https://github.com/signalapp/Signal-iOS): Private messengers. Much of the inspiration for the UI
  comes from Signal.

#### Back-end

* This project draws inspiration from [Hugh](https://github.com/IgnoranceAI/hugh), a remarkable tool that enables
  seamless communication with AI using minimal code.
* [go-openai](https://github.com/sashabaranov/go-openai): OpenAI ChatGPT, GPT-3, GPT-4, DALL·E, Whisper API wrapper for
  Go.
* [echo](https://github.com/labstack/echo): High performance, minimalist Go web framework
* [elevenlabs-go](https://github.com/haguro/elevenlabs-go): A Go API client library for the ElevenLabs speech synthesis
* [r3labs/sse](https://github.com/r3labs/sse/): Server Sent Events server and client for Golang
  platform.

#### UI

* [WikiArt.org](https://www.wikiart.org): Wikiart.org is a great place to find art online. Some wallpapers of this
  project come from WikiArt.org
* [grainy-gradients](https://github.com/cjimmy/grainy-gradients): Thanks to cjimmy for his amazing tutorial on noise and
  gradient background

We would also like to thank all other open-source projects and communities not listed here for their valuable
contributions to our project.
