![Logo](./other/banner.png)

SongSurf is a music recommendation app designed to ride the waves of your musical preferences. Dive into a sea of personalized playlists and discover a harmonious journey through your favorite genres and artists. 

## Table of contents
- [Table of contents](#table-of-contents)
- [Requirements](#requirements)
- [Environment variables](#environment-variables)
- [Run Locally](#run-locally)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Authors](#authors)


## Requirements
- Node.js v20.9.0^
- Python 3.10.12^
- NPM 10.2.4^
- PiP 22.0.2^


## Environment variables
*/client/.env.local*
```
NEXT_PUBLIC_ALGORITHM_URL=""
```


## Run Locally

*Note: You have to set the .env variables before running the client server*

Clone the project

```bash
  git clone https://github.com/Asterki/songsurf
```

Go to the project's client

```bash
  cd songsurf/client
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

Go to the project's algorithm

```bash
  cd songsurf/algorithm
```

Install dependencies

```bash
  pip install -r requirements.txt
```

Start the server

```bash
  python3 src/index.py
```


## Screenshots

![App Screenshot](https://i.imgur.com/U4kFblr.png)
![App Screenshot](https://i.imgur.com/3bLazs2.png)
![App Screenshot](https://i.imgur.com/hEwlUJJ.png)


## Contributing

Contributions are always welcome!

See `CONTRIBUTING.md` for ways to get started.



## License

[MIT](https://choosealicense.com/licenses/mit/)



## Authors

- [@asterki](https://www.github.com/asterki)