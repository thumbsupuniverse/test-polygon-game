import React, { useState } from "react";
import { Carousel, CarouselItem } from "react-bootstrap";
import shuffle from "lodash.shuffle";

import { Button } from "components/ui/Button";
import { OuterPanel } from "components/ui/Panel";

import upArrow from "assets/icons/arrow_up.png";
import downArrow from "assets/icons/arrow_down.png";
import question from "assets/icons/expression_confused.png";
import leftArrow from "assets/icons/arrow_left.png";
import rightArrow from "assets/icons/arrow_right.png";

const roundToOneDecimal = (number: number) => Math.round(number * 10) / 10;
export enum CharityAddress {
  TheWaterProject = "0x060697E9d4EEa886EbeCe57A974Facd53A40865B",
  Heifer = "0xD3F81260a44A1df7A7269CF66Abd9c7e4f8CdcD1",
  CoolEarth = "0x3c8cB169281196737c493AfFA8F49a9d823bB9c5",
}
interface Charity {
  name: string;
  info: string;
  url: string;
  address: CharityAddress;
}

const CHARITIES: Charity[] = shuffle([
  {
    name: "The Water Project",
    info: "You can provide clean, safe and reliable water today.",
    url: "https://thewaterproject.org/donate-ethereum",
    address: CharityAddress.TheWaterProject,
  },
  {
    name: "The Heifer Project",
    info: "We do more than train farmers. We grow incomes.",
    url: "https://www.heifer.org/give/other/digital-currency.html",
    address: CharityAddress.Heifer,
  },
  {
    name: "Cool Earth",
    info: "Aim to halt deforestation and its impact on our climate.",
    url: "https://www.coolearth.org/cryptocurrency-donations/",
    address: CharityAddress.CoolEarth,
  },
]);

interface CharityDetailProps extends Charity {
  onDonateAndPlayClick: (address: CharityAddress) => void;
}

const CharityDetail = ({
  url,
  name,
  info,
  address,
  onDonateAndPlayClick,
}: CharityDetailProps) => {
  const onAboutClick = (url: string) => {
    window.open(url);
  };

  return (
    <OuterPanel className="flex-col inline-flex items-center justify-center w-full">
      <div className="flex flex-col items-center mb-3 whitespace-normal">
        <h5 className="text-sm text-shadow underline mb-3 text-center">
          {name}
        </h5>
        <p className="text-xs text-center text-shadow mb-2 px-5 two-line-ellipsis">
          {info}
        </p>
      </div>

      <div className="flex w-full">
        <Button className="w-full mr-1" onClick={() => onAboutClick(url)}>
          <span className="text-xs mr-1">About</span>
          <img src={question} className="scale-110" alt="question-mark" />
        </Button>
        <Button
          className="w-full ml-1"
          onClick={() => onDonateAndPlayClick(address)}
        >
          <span className="text-xs whitespace-nowrap">Donate & Play</span>
        </Button>
      </div>
    </OuterPanel>
  );
};

interface Props {
  onDonate: (charityAddress: CharityAddress, donation: number) => void;
}

export const Donation: React.FC<Props> = ({ onDonate }) => {
  const [donation, setDonation] = React.useState(1.0);
  const [activeIdx, setActiveIndex] = useState(0);

  const onDonationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDonation(roundToOneDecimal(e.target.valueAsNumber));
  };

  const incrementDonation = () => {
    setDonation((prevState) => roundToOneDecimal(prevState + 0.1));
  };

  const decrementDonation = () => {
    if (donation === 1.0) {
      setDonation(1.0);
    } else setDonation((prevState) => roundToOneDecimal(prevState - 0.1));
  };

  const onDonateAndPlayClick = (charityAddress: CharityAddress) => {
    onDonate(charityAddress, donation);
  };

  const updateActiveIndex = (newIdx: number) => {
    if (newIdx < 0) {
      setActiveIndex(0);
    }

    if (newIdx > CHARITIES.length - 1) {
      setActiveIndex(CHARITIES.length - 1);
      return;
    }

    setActiveIndex(newIdx);
  };

  return (
    <div className="mb-4 relative">
      <div className="flex flex-col text-shadow items-center">
        <h2 className="text-base mb-2">Donate to play.</h2>
        <p className="text-xs mb-3 text-center">
          To start a farm, we require a minimum donation of 1 Matic to support
          the operating costs of Sunflower Land.
        </p>
        <p className="text-xs mb-3 text-center">
          10% of this donation will go to a charity of your choice.
        </p>
      </div>
      <div className="flex flex-col items-center mb-3">
        <div className="relative">
          <input
            type="number"
            className="text-shadow shadow-inner shadow-black bg-brown-200 w-24 p-1 text-center"
            step="0.1"
            min={1.0}
            value={donation}
            onChange={onDonationChange}
          />
          <img
            src={upArrow}
            alt="increment donation value"
            className="cursor-pointer absolute -right-4 top-0"
            onClick={incrementDonation}
          />
          <img
            src={downArrow}
            alt="decrement donation value"
            className="cursor-pointer absolute -right-4 bottom-0"
            onClick={decrementDonation}
          />
        </div>
        <span className="text-[10px] text-shadow mt-2">Minumum of 1 MATIC</span>
      </div>
      <p className="text-center mb-3 mt-10">Select a charity</p>
      <Carousel
        activeIndex={activeIdx}
        onSelect={updateActiveIndex}
        prevIcon={
          <img
            src={leftArrow}
            alt="left-arrow"
            className="h-5 cursor-pointer absolute left-2 sm:left-4"
            onClick={() => updateActiveIndex(activeIdx - 1)}
          />
        }
        nextIcon={
          <img
            src={rightArrow}
            alt="right-arrow"
            className="h-5 cursor-pointer absolute right-2 sm:right-4"
            onClick={() => updateActiveIndex(activeIdx + 1)}
          />
        }
      >
        {CHARITIES.map((props: Charity) => (
          <CarouselItem key={props.url}>
            <CharityDetail
              {...props}
              onDonateAndPlayClick={onDonateAndPlayClick}
            />
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  );
};
