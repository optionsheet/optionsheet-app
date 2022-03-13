import {
  GET_TRADE_SUCCESS,
  GET_TRADES_SUCCESS,
  UPDATE_TRADE_SUCCESS
} from "../actions/actionTypes";
import { Trade } from "../../common/models/trade";
import _ from "lodash";
import produce from "immer";
import { Tag } from "../../common/models/tag";

const getAllTradeTags = (trades: Trade[]) => {
  return _.uniq(trades
    .map((trade) => trade.tags)
    .flat());
};

interface TradeReducerState {
  trade: Trade;
  trades: Trade[];
  tags: Tag[];
}

const initialState: Readonly<Partial<TradeReducerState>> = {};

const tradeReducer = produce((state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TRADES_SUCCESS:
      state.trades = payload;
      state.tags = getAllTradeTags(payload);
      break;
    case GET_TRADE_SUCCESS:
    case UPDATE_TRADE_SUCCESS:
      state.trade = { ...state.trade, ...payload };
      state.trades[state.trades.findIndex((trade) => trade.id === state.trade.id)] = { ...state.trade, ...payload };
      break;
  }

  return state;
}, initialState);

export default tradeReducer;