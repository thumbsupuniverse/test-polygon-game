import React, { useContext, useState } from "react";
import { useActor } from "@xstate/react";

import { Context } from "features/game/GameProvider";

import { Label } from "components/ui/Label";
import { Panel } from "components/ui/Panel";

import player from "assets/icons/player.png";
import arrowLeft from "assets/icons/arrow_left.png";
import arrowRight from "assets/icons/arrow_right.png";

interface Props {}

export const shortAddress = (address: string): string => {
  return `${address.slice(0, 5)}...${address.slice(-4)}`;
};

export const Address: React.FC<Props> = () => {
  const { gameService } = useContext(Context);
  const [
    {
      context: { state },
    },
  ] = useActor(gameService);

  const [tooltipMessage, setTooltipMessage] = useState("Click to copy");
  const [showAddress, setShowAddress] = useState(true);
  const [showLabel, setShowLabel] = useState(false);

  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(state.address as string);
    setTooltipMessage("Copied!");
    setTimeout(() => {
      setTooltipMessage("Click to copy");
    }, 2000);
  };

  const handleMouseEnter = () => {
    setShowLabel(true);
  };

  const handleMouseLeave = () => {
    setShowLabel(false);
  };

  // // Readonly session
  // if (!state.address) {
  //   return null;
  // }

  return (
    <div className="fixed bottom-2 right-2 z-50 shadow-lg">
      <Panel>
        <div className="flex items-center">
          <img src={player} className="h-8 mr-2 z-50" />

          <span
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={copyToClipboard}
            className={`transition-all cursor-pointer duration-200 origin-[center_right] text-small text-shadow ${
              showAddress
                ? "scale-x-1 opacity-100 max-w-[400px] mr-2"
                : "scale-x-0 opacity-0 max-w-[0px] -mr-1"
            }`}
          >
            {shortAddress("0xD2a0e78D34667775607cc0edC3f70eE0Fe930432")}
          </span>

          <img
            className="hover:opacity-70 cursor-pointer h-4"
            src={showAddress ? arrowRight : arrowLeft}
            onClick={() => {
              setShowAddress(!showAddress);
            }}
          />
        </div>
        <div
          className={`absolute mr-5 bottom-20 -right-[1rem] transition pointer-events-none ${
            showLabel ? "opacity-100" : "opacity-0"
          }`}
        >
          <Label>{tooltipMessage}</Label>
        </div>
      </Panel>
    </div>
  );
};
