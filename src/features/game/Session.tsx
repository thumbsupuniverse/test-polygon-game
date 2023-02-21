import React, {useRef, useEffect} from "react";
import ScrollContainer from "react-indiana-drag-scroll";

import background from "assets/land/background.png";

import { Game } from "./Game";
import { GameProvider } from "./GameProvider";
import { ToastProvider } from "./toast/ToastQueueProvider";
import mapMovement from "./lib/mapMovement";

export const Session: React.FC = () => {
  // catching and passing scroll container to keyboard listeners
  const container = useRef(null);

  useEffect(() => {
    mapMovement.addListeners(container.current)
    return () => {
      mapMovement.removeListeners()
    }
  }, [container])

  // Load data
  return (
    <GameProvider>
      <ToastProvider>
        <ScrollContainer className="bg-green-background overflow-scroll relative w-full h-full" innerRef={container}>
          <div
            id="gameboard"
            className="relative h-gameboard w-gameboard"
            // TODO dynamic game board size based on tile dimensions
          >
            <img src={background} className="absolute inset-0 w-full h-full" />

            <Game />
          </div>
        </ScrollContainer>
      </ToastProvider>
    </GameProvider>
  );
};
