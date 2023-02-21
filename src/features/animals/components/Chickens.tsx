import React, { useContext } from "react";
import { useActor } from "@xstate/react";

import coop from "assets/nfts/chicken_coop.png";

import { GRID_WIDTH_PX } from "features/game/lib/constants";
import { Context } from "features/game/GameProvider";

export const Chickens: React.FC = () => {
  const { gameService, selectedItem } = useContext(Context);
  const [
    {
      context: { state },
    },
  ] = useActor(gameService);

  return (
    <>
      {state.inventory["Chicken Coop"] && (
        <img
          src={coop}
          style={{
            width: `${GRID_WIDTH_PX * 2.5}px`,
            right: `${GRID_WIDTH_PX * 1.3}px`,
            top: `${GRID_WIDTH_PX * 2.6}px`,
          }}
          className="absolute"
        />
      )}
    </>
  );
};
