import RaisedButton from 'material-ui/RaisedButton';

import TextField from 'material-ui/TextField';

import React from 'react';

const MenuGenerator = ({ inputChange, inputSubmit }) => (
  <div className="menuBar">
    {/* <div className="headerMenu">
      <h1 className="header"> Sync-Gateway-LazyBoy </h1>
    </div> */}
    <div className="menuRow">
      <div className="menuManually">
        <TextField
          hintText="Hint IbrahimPGE"
          errorText="This field is required"
          floatingLabelText="Github User"
          onChange={inputChange}
        />
      </div>
      <div className="submitManually">
        <RaisedButton
          backgroundColor="red"
          onClick={inputSubmit}
          label="SUBMIT"
        />
      </div>
    </div>
  </div>
);

// MenuGenerator.propTypes = {
//   inputSubmit: PropTypes.func.isRequired,
//   inputChange: PropTypes.func.isRequired,
// };

export default MenuGenerator;
