const initialState = {
    isLoading: true,
    userName: null,
    userToken: null,
    UserAccountDetails: [],
    showModal: false,
    inspectionDetails: [],
    checkList: [],
    adhocInspection: [],
    Search_Establishment_HistoryResult: [],
    Search_Establishment_HistoryResult_NOC:[],
    get_Assessment: [],
    Eshtablisment_Count: [],
    Eshtablisment_Inspection_Type: [],
    Add_Questionnaires_Attachment: '',
    checkListData: [],
    pushnotification: true,
    GET_INSPECTION_REPORT:null,
    recall:[],
    SR_Data:[]
}

const SI_reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RETRIEVE_TOKEN':
            return {
                ...state,
                userToken: action.token,
                isLoading: false,
            };
        case 'PUSHNOTIFICATION_SCREEN':
            console.log('push_reducer');
            return {
                ...state,
                pushnotification: true
            }
        case 'LOGIN':
            console.log('userfromreducer', action.UserAccountDetails);
            return {
                ...state,
                userName: action.id,
                userToken: action.token,
                UserAccountDetails: action.UserAccountDetails,
                isLoading: false,
            };
        case 'GET_INSPECTION_DETAILS':
            return {
                ...state,
                inspectionDetails: action.payload,
            }
        case 'GET_ASSESSMENT':
            return {
                ...state,
                get_Assessment: action.payload,
            }
        case 'GET_CHECK_LIST':
            return {
                ...state,
                checkList: action.payload,
                checkListData: action.dataObj
            }
        case 'ADHOC_INSPECTION':
            return {
                ...state,
                adhocInspection: action.payload,
            }
        case 'RECALL':
            return {
                ...state,
                recall: action.payload,
            }
        case 'SEARCH_ESHTABLISHMENT_RESULT_NOC':
            return {
                ...state,
                Search_Establishment_HistoryResult_NOC: action.payload,
            }
            case 'SEARCH_ESHTABLISHMENT_RESULT':
            return {
                ...state,
                Search_Establishment_HistoryResult: action.payload,
                Eshtablisment_Count: action.eshtablish_count,
                Eshtablisment_Inspection_Type: action.eshtablish_inspection_type,
                SR_Data:action.getSRData
            }
        case 'ADD_QUESTIONNAIRES_ATTACHMENT':
            return {
                ...state,
                Add_Questionnaires_Attachment: action.payload,
            }
        case 'GET_INSPECTION_REPORT':
          //  console.log('from_reducer_report',action.payload );

            return {
                ...state,
                GET_INSPECTION_REPORT: action.payload,
            }
        case 'LOGOUT':
            return {
                ...state,
                userName: null,
                userToken: null,
                isLoading: false,
            };
        case 'SHOW_MODAL':
            return {
                ...state,
                showModal: true
            }
        case 'SHOW_LOADER':
            return {
                ...state,
                isLoading: true
            }
        case 'HIDE_LOADER':
            return {
                ...state,
                isLoading: false
            }

        default:
            return state;
    }
};

export default SI_reducer;
