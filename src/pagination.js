import React, {Component, PropTypes} from 'react';
import LeftIcon from './lefticon.js';
import RightIcon from './righticon.js';
import FirstPage from './firstpage.js';
import LastPage from './lastpage.js';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 1,
      totalPages: Math.ceil(props.totalElements/props.perPage),
      activeFirst: 1,
      activeLast: Math.ceil(props.totalElements/props.perPage) > props.visiblePages ? props.visiblePages : Math.ceil(props.totalElements/props.perPage)
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      selected: 1,
      totalPages: Math.ceil(nextProps.totalElements/nextProps.perPage),
      activeFirst: 1,
      activeLast: Math.ceil(nextProps.totalElements/nextProps.perPage) > nextProps.visiblePages ? nextProps.visiblePages : Math.ceil(nextProps.totalElements/nextProps.perPage)
    });
  }
  getPages(){
    let pages = [];
    for (let i=1; i<=this.state.totalPages; i++) {
      if (this.state.totalPages > this.props.visiblePages ) {
        if(i > this.state.activeLast || i < this.state.activeFirst) {
          pages.push(<li key={i}><a ref={i}
            className= {this.isActive(i + ' ' + 'hidden')} onClick= {()=>this.onPageClick(i)}
            role="button">{i}</a></li>);
        } else {
          pages.push(<li key={i}><a ref={i}
            className= {this.isActive(i.toString())} onClick= {()=>this.onPageClick(i)}
            role="button">{i}</a></li>);
        }
      } else {
        pages.push(<li key={i}><a ref={i}
          className= {this.isActive(i.toString())} onClick= {()=>this.onPageClick(i)}
          role="button">{i}</a></li>);
      }
    }
    return pages;
  }


  onPageClick(page){
    let selectedOffset = this.state.selected;
    if (page === 'first') {
      selectedOffset = 1;
      this.setState({activeLast: Math.ceil(this.props.totalElements/this.props.perPage) > this.props.visiblePages ? this.props.visiblePages : Math.ceil(this.props.totalElements/this.props.perPage)});
      this.setState({activeFirst: 1});
    } else if (page === 'last') {
      selectedOffset = this.state.totalPages;
      this.setState({activeLast: this.state.totalPages});
      this.setState({activeFirst: this.state.totalPages-this.props.visiblePages});
    } else if (page === 'previous')   {
      if (this.state.selected !== 1) {
        selectedOffset = selectedOffset - 1;
      }
        if(this.state.selected > this.props.visiblePages) {
          this.setState({activeLast: this.state.activeLast-1});
          this.setState({activeFirst: this.state.activeFirst-1});
        }
    } else if (page === 'next') {
      if (this.state.selected !== this.state.totalPages) {
        selectedOffset = selectedOffset + 1;
      }
      if (this.state.activeLast !== this.state.totalPages) {
        this.setState({activeLast: this.state.activeLast+1});
        this.setState({activeFirst: this.state.activeFirst+1});
      }
    } else {
      selectedOffset = page;
    }
    this.setState({selected: selectedOffset});
    this.props.onSelect(selectedOffset);
  }
  isActive(value){
    if(this.state.selected && value.split(" ")[0]===this.state.selected.toString() && this.state.selected > (this.props.visiblePages)) {
      return this.state.selected + ' ' + 'active';
    } else {
      if (this.state.selected) {
        return value + ' ' + (value.split(" ")[0]===this.state.selected.toString() ? 'active':'default');
    }
  }
  }
  render() {
    return (
      <ul className="react-paginate-list">
        <li><a className= {this.isActive('first')} onClick= {()=>this.onPageClick('first')} role="button"><FirstPage /></a></li>
        <li><a className= {this.isActive('previous')} onClick= {()=>this.onPageClick('previous')} role="button"><LeftIcon /></a></li>
        {this.getPages()}
        <li><a className= {this.isActive('next')} onClick= {()=>this.onPageClick('next')} role="button"><RightIcon /></a></li>
        <li><a className= {this.isActive('last')} onClick= {()=>this.onPageClick('last')}role="button"><LastPage /></a></li>
      </ul>
    );
  }
}
Pagination.propTypes = {
  offSet: PropTypes.number,
  visiblePages: PropTypes.number,
  perPage: PropTypes.number,
  totalElements: PropTypes.number,
  onSelect: PropTypes.object,
};

export default Pagination;
