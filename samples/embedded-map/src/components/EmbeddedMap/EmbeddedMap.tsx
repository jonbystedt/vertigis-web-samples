import React, { useEffect, useRef } from "react";
import {
    LayoutElement,
    LayoutElementProperties,
} from "@vertigis/web/components";
import { Viewer, TransitionMode } from "mapillary-js";
// Import the necessary CSS for the Mapillary viewer to be styled correctly.
import "mapillary-js/dist/mapillary.min.css";
import EmbeddedMapModel from "./EmbeddedMapModel";

export default function EmbeddedMap(
    props: LayoutElementProperties<EmbeddedMapModel>
): React.ReactElement {
    const { model } = props;
    const mlyRootEl = useRef<HTMLDivElement>();

    useEffect(() => {
        const mapillary = new Viewer(
            mlyRootEl.current,
            model.mapillaryKey,
            // Mapillary node to start on.
            null,
            {
                component: {
                    cover: false,
                    marker: {
                        visibleBBoxSize: 100,
                    },
                    mouse: {
                        doubleClickZoom: false,
                    },
                },
                transitionMode: TransitionMode.Instantaneous,
            }
        );
        model.mapillary = mapillary;

        const handleWindowResize = () => {
            mapillary.resize();
        };

        // Viewer size is dynamic so resize should be called every time the window size changes.
        window.addEventListener("resize", handleWindowResize);

        // Clean up when this component is unmounted from the DOM.
        return () => {
            window.removeEventListener("resize", handleWindowResize);
            // Clear out the Mapillary instance property. This will take care of
            // cleaning up.
            model.mapillary = undefined;
        };
    }, [model, model.id, model.mapillaryKey]);

    return (
        <LayoutElement {...props} stretch>
            <div ref={mlyRootEl} className="EmbeddedMap-map-container"></div>
        </LayoutElement>
    );
}
