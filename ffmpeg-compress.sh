ffmpeg -i wingrip.mp4 -filter:v scale=-1:720 -c:v libvpx-vp9 -b:v 1.00M -c:a libopus -b:a 96k wingrip.webm