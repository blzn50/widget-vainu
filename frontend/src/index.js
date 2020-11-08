import { displayWidget, displayWidgetWithError } from './helpers/script';

const supportedAPI = ['load'];
const API_ROOT = 'http://localhost:3001/businesses';

const app = async (window) => {
  console.log('Vainu widget loading');

  // All methods called from script should be called
  let globalObject = window[window['vainu-widget']];
  let queue = globalObject.q;
  if (queue) {
    for (var i = 0; i < queue.length; i++) {
      apiHandler(queue[i][0], queue[i][1], queue[i][2]);
    }
  }
};

/**
 * apiHandler - handles all api calls from the script
 * @param {String} api - api method
 * @param {String} targetContainerClass - target container class in webpage where widget will be loaded
 * @param {String} businessId - business id to fetch data from Vainu
 */
const apiHandler = (api, targetContainerClass, businessId) => {
  if (!api) {
    throw Error('API method required');
  }
  api = api.toLowerCase();

  switch (api) {
    case 'load':
      if (!businessId) {
        console.error(`Vainu: No business id provided!`);
        break;
      }
      fetchVainuData(businessId).then((data = {}) => {
        if (typeof data === 'string' && data.includes('ERROR')) {
          // Error string
          displayWidgetWithError(data, targetContainerClass);
        } else if (!data.business_id) {
          displayWidgetWithError(
            'Company information not found with the business id: ' + businessId,
            targetContainerClass
          );
        } else {
          displayWidget(data, targetContainerClass);
        }
      });
      break;
    default:
      console.log(`Message from vainu:\nAvailable API: ${supportedAPI.join(', ')}`);
  }
};

/**
 * fetchVainuData - fetch data from Vainu database
 * @param {String} businessId - business id to fetch data from Vainu
 * @return {Object} - returns JSON object
 */
const fetchVainuData = async (businessId) => {
  try {
    const response = await fetch(`${API_ROOT}/${businessId}/`);
    const data = await response.json();
    return data;
  } catch (e) {
    return 'ERROR: Something went wrong! Please contact vainu support.';
  }
};

/*  Run script */
app(window);
