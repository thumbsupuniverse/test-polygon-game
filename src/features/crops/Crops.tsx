import React, { useContext, useState } from "react";
import { useActor } from "@xstate/react";

import { Context } from "features/game/GameProvider";
import { AppIconProvider } from "features/crops/AppIconProvider";
import { GRID_WIDTH_PX } from "features/game/lib/constants";

import { Section } from "lib/utils/useScrollIntoView";

import house from "assets/buildings/house.png";
import smoke from "assets/buildings/smoke.gif";

import { CropZoneOne } from "./components/CropZoneOne";
import { CropZoneTwo } from "./components/CropZoneTwo";
import { CropZoneThree } from "./components/CropZoneThree";
import { CropZoneFour } from "./components/CropZoneFour";
import { Market } from "./components/Market";

interface Props {}

export const Crops: React.FC<Props> = () => {
  const { gameService, selectedItem } = useContext(Context);
  const [
    {
      context: { state },
    },
  ] = useActor(gameService);

  return (
    <AppIconProvider>
      {/*Container*/}
      <div
        style={{
          width: `${GRID_WIDTH_PX * 25}px`,
          height: `${GRID_WIDTH_PX * 12}px`,
          left: `calc(50% - ${GRID_WIDTH_PX * 13}px)`,
          top: `calc(50% - ${GRID_WIDTH_PX * 23}px)`,
        }}
        className="absolute"
      >
        {/* Navigation Center Point */}
        <span
          id={Section.Crops}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />

        <Market />

        <CropZoneOne />
        <CropZoneTwo />
        <CropZoneThree />
        <CropZoneFour />

        <div
          style={{
            width: `${GRID_WIDTH_PX * 4}px`,
            position: "absolute",
            right: `${GRID_WIDTH_PX * 0.5}px`,
            top: `${GRID_WIDTH_PX * 0.8}px`,
          }}
          className="relative"
        >
          <img src={house} alt="house" className="w-full" />
          <img
            src={smoke}
            style={{
              width: `${GRID_WIDTH_PX * 1}px`,
              position: "absolute",
              left: `${GRID_WIDTH_PX * 0.1}px`,
              top: `${GRID_WIDTH_PX * 0.8}px`,
            }}
          />
        </div>
      </div>
    </AppIconProvider>
  );
};
