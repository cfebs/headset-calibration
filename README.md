# Attempt at a headset calibrator

```
npm install
npm run build
```

Now just serve index.html

## Notes

The page will move two cursors ever outward until a focal point is reached.

You can use hash params to configure the tool:

```
http://localhost:8181/#speed=1&maxOffset=50
```

You can also use dev tools and console to configure

```
window.setSpeed(speed) speed: in ms to itterate
window.setMaxOffset(num) num: max itterations
window.restart() restarts the thing
```
