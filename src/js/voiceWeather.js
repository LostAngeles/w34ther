function voiceWeather() {
                    let source;
                    switch (icon) {
                        case 'fog':
                            source =
                                'https://sib3ri4nhusky.github.io/christmas.mp3';
                            break;
                        case 'clear-day':
                            source =
                                'https://sib3ri4nhusky.github.io/christmas.mp3';
                            break;
                        case 'clear-night':
                            source =
                                'https://sib3ri4nhusky.github.io/night.mp3';
                            break;
                        case ' partly-cloudy-day':
                            source =
                                'https://sib3ri4nhusky.github.io/christmas.mp3';
                            break;
                        case 'partly-cloudy-night':
                            source =
                                'https://sib3ri4nhusky.github.io/night.mp3';
                            break;
                        case 'cloudy':
                            source =
                                'https://sib3ri4nhusky.github.io/christmas.mp3';
                            break;
                        case 'rain':
                            source = 'https://sib3ri4nhusky.github.io/rain.mp3';
                            break;
                        case 'sleet':
                            source =
                                'https://sib3ri4nhusky.github.io/christmas.mp3';
                            break;
                        case 'snow':
                            source =
                                'https://sib3ri4nhusky.github.io/christmas.mp3';
                            break;
                        case 'wind':
                            source = 'https://sib3ri4nhusky.github.io/wind.mp3';
                            break;
                        default:
                            alert('Нет таких значений');
                    }

                    let audio = document.createElement('audio');
                    audio.className = 'audio';
                    console.log(audio.className);
                    audio.src = source;
                    titleGeo.click();
                    titleWeather.click();
                    audio.load();
                    audio.play();
                    console.log(icon);
                }