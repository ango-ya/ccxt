declare const errorHierarchy: {
    BaseError: {
        ExchangeError: {
            AuthenticationError: {
                PermissionDenied: {
                    AccountNotEnabled: {};
                };
                AccountSuspended: {};
            };
            ArgumentsRequired: {};
            BadRequest: {
                BadSymbol: {};
            };
            OperationRejected: {
                NoChange: {
                    MarginModeAlreadySet: {};
                };
            };
            BadResponse: {
                NullResponse: {};
            };
            InsufficientFunds: {};
            InvalidAddress: {
                AddressPending: {};
            };
            InvalidOrder: {
                OrderNotFound: {};
                OrderNotCached: {};
                CancelPending: {};
                OrderImmediatelyFillable: {};
                OrderNotFillable: {};
                DuplicateOrderId: {};
                ContractUnavailable: {};
            };
            NotSupported: {};
            ProxyError: {};
        };
        OperationFailed: {
            NetworkError: {
                DDoSProtection: {};
                RateLimitExceeded: {};
                ExchangeNotAvailable: {
                    OnMaintenance: {};
                };
                InvalidNonce: {};
                RequestTimeout: {};
            };
        };
        ExchangeClosedByUser: {};
    };
};
export default errorHierarchy;
