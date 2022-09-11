/**
  * <FormValidator />
  */

import React from 'react';
import xss from 'xss';
import IntlMessages from './language-provider/IntlMessages';

const myxss = new xss.FilterXSS({
  whiteList: {
    u: [],
    br: [],
    b: [],
    i: [],
    ol: ['style'],
    ul: ['style'],
    li: [],
    p: ['style'],
    sub: [],
    sup: [],
    div: ['style'],
    em: [],
    strong: [],
    span: ['style'],
  },
});

export default class FormValidator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    };
  }

  componentDidMount() {
    this.subscription = this.props.emitter.addListener('formValidation', (errors) => {
      this.setState({ errors });
    });
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  dismissModal(e) {
    e.preventDefault();
    this.setState({ errors: [] });
  }

  render() {
    const errors = this.state.errors.map((error, index) => <li key={`error_${index}`} dangerouslySetInnerHTML={{ __html: myxss.process(error) }} />);

    return (
      <div>
        { this.state.errors.length > 0 &&
          <div className="relative px-3 py-3 mb-4 border rounded bg-red-200 border-red-300 text-red-800 validation-error">
            <div className="clearfix">
              <i className="fas fa-exclamation-triangle float-left"></i>
              <ul className="float-left">
                {errors}
              </ul>
            </div>
            <div className="clearfix">
              <a className="float-right inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline btn-default py-1 px-2 leading-tight text-xs  bg-red-600 text-white hover:bg-red-700" onClick={this.dismissModal.bind(this)}><IntlMessages id="dismiss" /></a>
            </div>
          </div>
        }
      </div>
    );
  }
}
