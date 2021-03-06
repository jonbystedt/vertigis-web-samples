# Geocortex Web embedded in iframe

This sample demonstrates how to embed Geocortex Web within another application. This can be extremely useful for integrating with other systems and applications to create powerful integration use cases.

In this example we didn't create any custom code using the Geocortex Web SDK, as it may not be required in all cases. However, using the Web SDK can allow you to create a highly flexible translation layer to bridge the communication between Geocortex Web and other applications.

The [parent HTML page in this sample](app/parent.html) shows an example of embedding Geocortex Web within another application. It subscribes to [`postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) events from the Geocortex Web frame, as well as sends `postMessage` events to Geocortex Web when clicking on buttons within the parent page.

The [app config in this sample](app/app.json) configures the application to support `postMessage`. By default, Geocortex Web will not send or receieve `postMessage` events unless explicitly configured to do so. The app config also configures a menu item to invoke the `viewer.post-message` command which will send the input argument of the command to the parent frame.

**WARNING: You should explicitly configure the `postMessageAllowedOrigin` setting in your app config to the specific origin URL of the application you are integrating with. We've used `*` to simplify the demonstration of this sample, but you should always specify a specific URL for `postMessageAllowedOrigin`, not `*`, if you know where the other window's document should be located. Failing to provide a specific origin discloses the data you send to any interested malicious site.** To learn more see the [`postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#Security_concerns) documentation.
