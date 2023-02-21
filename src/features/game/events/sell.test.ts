import Decimal from "decimal.js-light";
import { GameState } from "../types/game";
import { CROPS } from "../types/crops";
import { sell } from "./sell";

let GAME_STATE: GameState = {
  id: 1,
  fields: {},
  balance: new Decimal(0),

  inventory: {},
};

describe("sell", () => {
  it("does not sell a non sellable item", () => {
    expect(() =>
      sell({
        state: GAME_STATE,
        action: {
          type: "item.sell",
          item: "Axe",
          amount: 1,
        },
      })
    ).toThrow("Not for sale");
  });

  it("does not sell  an unusual amount", () => {
    expect(() =>
      sell({
        state: {
          ...GAME_STATE,
          inventory: {
            Sunflower: new Decimal(5),
          },
        },
        action: {
          type: "item.sell",
          item: "Sunflower",
          amount: 2,
        },
      })
    ).toThrow("Invalid amount");
  });

  it("does not sell a missing item", () => {
    expect(() =>
      sell({
        state: GAME_STATE,
        action: {
          type: "item.sell",
          item: "Sunflower",
          amount: 1,
        },
      })
    ).toThrow("Insufficient crops to sell");
  });

  it("sells an item", () => {
    const state = sell({
      state: {
        ...GAME_STATE,
        inventory: {
          Sunflower: new Decimal(5),
        },
      },
      action: {
        type: "item.sell",
        item: "Sunflower",
        amount: 1,
      },
    });

    expect(state.inventory.Sunflower).toEqual(new Decimal(4));
    expect(state.balance).toEqual(new Decimal(0.02));
  });

  it("sell an item in bulk given sufficient quantity", () => {
    const state = sell({
      state: {
        ...GAME_STATE,
        inventory: {
          Sunflower: new Decimal(11),
        },
      },
      action: {
        type: "item.sell",
        item: "Sunflower",
        amount: 10,
      },
    });

    expect(state.inventory.Sunflower).toEqual(new Decimal(1));
    expect(state.balance).toEqual(new Decimal(0.2));
  });

  it("does not sell an item in bulk given insufficient quantity", () => {
    expect(() =>
      sell({
        state: {
          ...GAME_STATE,
          inventory: {
            Sunflower: new Decimal(2),
          },
        },
        action: {
          type: "item.sell",
          item: "Sunflower",
          amount: 10,
        },
      })
    ).toThrow("Insufficient crops to sell");
  });

  it("sells a cauliflower for a normal price", () => {
    const state = sell({
      state: {
        ...GAME_STATE,
        inventory: {
          Cauliflower: new Decimal(1),
        },
      },
      action: {
        type: "item.sell",
        item: "Cauliflower",
        amount: 1,
      },
    });

    expect(state.balance).toEqual(new Decimal(CROPS.Cauliflower.sellPrice));
  });

  it("sells a cauliflower for a double the price if they have golden cauliflower", () => {
    const state = sell({
      state: {
        ...GAME_STATE,
        inventory: {
          Cauliflower: new Decimal(1),
          "Golden Cauliflower": new Decimal(1),
        },
      },
      action: {
        type: "item.sell",
        item: "Cauliflower",
        amount: 1,
      },
    });

    expect(state.balance).toEqual(new Decimal(CROPS.Cauliflower.sellPrice * 2));
  });
});
