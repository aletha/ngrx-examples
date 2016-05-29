import {ActionReducer, Action} from "@ngrx/store";
import {ADD_TO_CART} from './products';

export const CHECKOUT_REQUEST = 'CHECKOUT_REQUEST'
export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS'
export const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE'

export interface ICart {
    productIds: any[];
    quantityById: any;
}

const initialState: ICart = {
    productIds: [], quantityById: {}
}

export const cart: ActionReducer<ICart> = (state: ICart = initialState, action: Action) => {
    switch (action.type) {
        case ADD_TO_CART:
            if (state.productIds.indexOf(action.payload) !== -1) {
                return Object.assign({},
                    state,
                    { quantityById:
                        Object.assign({}, state.quantityById,
                            {[action.payload]: (state.quantityById[action.payload] || 0) + 1}
                        )
                    }
                );
            }
            return Object.assign({},
                    state,
                    { productIds: [...state.productIds, action.payload],
                        quantityById:
                            Object.assign({}, state.quantityById,
                                {[action.payload]: (state.quantityById[action.payload] || 0) + 1}
                            )
                    }
                );
        case CHECKOUT_SUCCESS:
            return initialState;
        default:
            return state;
    }
};

