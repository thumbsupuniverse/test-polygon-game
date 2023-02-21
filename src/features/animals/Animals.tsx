import React from "react";

import { Section } from "lib/utils/useScrollIntoView";

import { Chickens } from "./components/Chickens";
import { GRID_WIDTH_PX } from "features/game/lib/constants";

interface Props {}

export const Animals: React.FC<Props> = () => {
  return (
    // Container
    <div
      style={{
        height: `${GRID_WIDTH_PX * 6}px`,
        width: `${GRID_WIDTH_PX * 20}px`,
        left: `calc(50% -  ${GRID_WIDTH_PX * 10}px)`,
        top: `calc(50% -  ${GRID_WIDTH_PX * 30}px)`,
      }}
      className="absolute"
    >
      <div className="h-full w-full relative">
        {/* Navigation Center Point */}
        <span
          id={Section.Animals}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />

        <Chickens />
      </div>
    </div>
  );
};
