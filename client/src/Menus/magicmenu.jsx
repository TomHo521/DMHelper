import React from 'react';
import SpellItem from './SpellItem';
import spellList from '../../../test/magic';



class MagicMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      spellList: spellList,
    }

    this.spellClickHandler = this.spellClickHandler.bind(this);

  }

  spellClickHandler = (e) => {

    console.log('name of the spell that was clicked.', e.currentTarget.getAttribute('name'));

    // attack was clicked AND it is this players turn.
    if (this.props.thisPlayer === this.props.activeEntity) {
      
      this.props.logNext(`${this.props.thisPlayer} is selecting their target`);
      // this.setState({ acquiringTarget: true });

      let spellKey = e.currentTarget.getAttribute('name');

      this.props.setAcquiringTarget({
        action: 'spellAttack',
        spellKey: spellKey,
      });

    } else {
      this.props.logNext(`Please wait your turn -${this.props.thisPlayer}:(spell attack selected)`);      
    }

    this.props.closeMagicModal();
  }

  render () {
    let spellList = Object.keys(this.state.spellList).map((element, key) => {
      return <SpellItem spell={this.state.spellList[element]} key={key} spellClickHandler={this.spellClickHandler}/>
    });
    
  return (
    <div className="magic-modal" id="magicWindow">
      <div className="magic-modal-content">
        <div className="magic-modal-close" onClick={this.props.closeMagicModal}>&times;</div>
        <br></br>
        <h3 className="spellBanner" onClick={this.props.closeMagicModal}>YOUR SPELLS</h3><br></br>
          
        <div className="magic-modal-spelldiv">
          <table className="magic-table">
            <tbody>
            {spellList}
            </tbody>
          </table>
          <table className="magic-table">
            <tbody>
            {spellList}
            </tbody>
          </table>
        </div>
      </div>
    </div> 
  )
  }
}
export default MagicMenu;

