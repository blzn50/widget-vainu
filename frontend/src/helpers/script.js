import './styles.css';

const wrapperEl = document.createElement('div');
let body;

/**
 * displayWidget - display vainu widget to target html container
 * @param {Object} dataPayload  - vainu JSON object data to render
 * @param {String} targetClassName - target class container
 *  */
export function displayWidget(dataPayload = {}, targetClassName = '') {
  const template = getTemplate(dataPayload);
  appendElementToDom(template, targetClassName);
}

/**
 * displayWidgetWithError - display vainu widget with error message
 * @param {String} errorMessage  - error message to render in widget
 * @param {String} targetClassName - target class container
 * */
export function displayWidgetWithError(errorMessage = '', targetClassName = '') {
  const template = getErrorMessageTemplate(errorMessage);
  appendElementToDom(template, targetClassName);
}

//******************************** Helper functions ********************************//

/**
 * appendElementToDom
 * @param {String} template - HTML template fo data rendering
 * @param {String} targetClassName - target class container
 * */
const appendElementToDom = (template, targetClassName) => {
  wrapperEl.innerHTML = template;

  /* append elements to html body */
  body = document.getElementsByClassName(targetClassName)[0];
  body.appendChild(wrapperEl.children[0]);
};

const getTemplate = (payload) => {
  const {
    business_id: businessId,
    company_name: companyName,
    link,
    founded,
    address,
    city,
    facebook,
    linkedin,
    twitter,
    turn_over: turnOver,
    staff_number: staffCount,
    vainu_link: vainuLink,
  } = payload;
  return `
    <div class="parent-wrapper">
        <div class="vainu-brand">
            <img 
                src="https://www.vainu.com/hubfs/_vainu2019/logos/vainu-logo-bitmap-rgb-ver-black-1200px.png" alt="Vainu logo" 
                height="40"
                width="40"
            />
        </div>
        <div class="widget-content">
            <h3 class="company-title">
                <a href="https://${link}" target="_blank" rel="noopener noreferrer">
                    ${companyName}
                </a>
            </h3>
            <div class="section">
                <div class="basic-info">
                    <h4>Basic info</h4>
                    <div><span class="title">Business Id:</span> <span class="value">${businessId}</span></div>
                    <div><span class="title">Employee size:</span> <span class="value">${
                      staffCount || `N/A`
                    }</span></div>
                    <div><span class="title">Turn over:</span> <span class="value">${turnOver} €</span></div>
                    <div><span class="title">Founded on:</span> <span class="value">${founded}</span></div>
                </div>
                <div class="address">
                    <h4>Address</h4>
                    <div>
                        ${
                          address && city
                            ? `
                                <a class="address-link" href="https://maps.google.com?daddr=${address} ${city}" target="_blank" rel="noopener noreferrer">
                                <div>${address}</div>
                                <div>${city}</div>
                                </a>
                            `
                            : `<div>N/A</div>`
                        }
                        <br />
                        ${
                          facebook
                            ? `
                                <a class="social-icon" href="${facebook}" target="_blank" rel="noopener noreferrer">
                                <i class="fa fa-facebook-square" aria-hidden="true"></i>
                                </a>
                            `
                            : ''
                        }
                        ${
                          twitter
                            ? `
                                <a class="social-icon" href="${twitter}" target="_blank" rel="noopener noreferrer">
                                <i class="fa fa-twitter-square" aria-hidden="true"></i>
                                </a>
                            `
                            : ''
                        }
                        ${
                          linkedin
                            ? `
                                <a class="social-icon" href="https://linkedin.com/company/${linkedin}" target="_blank" rel="noopener noreferrer">
                                <i class="fa fa-linkedin-square" aria-hidden="true"></i>
                                </a>
                            `
                            : ''
                        }
                    </div>
                </div>
            </div>
            <i>
                Already have vainu license? check more info <a href="${vainuLink}" target="_blank" rel="noopener noreferrer">here</a>
            </i>
        </div>
    </div>  
  `;
};

const getErrorMessageTemplate = (message = '') => {
  return `
    <div class="parent-wrapper">
        <div class="vainu-brand">
            <img 
                src="https://www.vainu.com/hubfs/_vainu2019/logos/vainu-logo-bitmap-rgb-ver-black-1200px.png" alt="Vainu logo" 
                height="40"
                width="40"
            />
        </div>
        <div class="widget-content">
            <h3 class="company-title">OOPS!</h3>
            <div class="error-message-section">
                ${message}
            </div>
        </div>    
    </div>  
    `;
};
