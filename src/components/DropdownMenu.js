import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import React from 'react';

const MenuGenerator = ({ handleChecked, selectedRepo, githubRepo }) => (
  <div className="menuBar">
    {/* <div className="headerMenu">
      <h1 className="header"> Sync-Gateway-LazyBoy </h1>
    </div> */}

    <div className="dropdownMenu">
      <h3> Repositories </h3>
      <DropDownMenu
        value={selectedRepo}
        onChange={e => {
          handleChecked(e);
        }}
      >
        {githubRepo.map(m => (
          <MenuItem key={m} value={m} label={m} primaryText={m} />
        ))}
      </DropDownMenu>
    </div>
  </div>
);

export default MenuGenerator;
