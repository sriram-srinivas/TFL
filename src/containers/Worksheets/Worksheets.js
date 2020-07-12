import React,{Component, Fragment} from 'react';
import axios from 'axios';
import worksheetCSS from './Worksheets.css';

import dictionary from '../../context/tflDictionary';
import SearchBar from '../../components/SearchBar/SearchBar';
import Gallery from '../../components/Gallery/Gallery';
import GalleryMenu from '../../components/Gallery/GalleryMenu/GalleryMenu';
import GalleryFilter from '../../components/Gallery/GalleryFilter/GalleryFilter';
import WorksheetInfo from '../../components/WorksheetInfo/WorksheetInfo';
import GalleryFilterCSS from '../../components/Gallery/GalleryFilter/GalleryFilter.css';
import RelatedResources from '../../components/RelatedResources/RelatedResources';

class Worksheets extends Component {

    static contextType = dictionary;
    state ={
        activePage: "Gallery",
        worksheet: this.context.dummyList[0],
        currentPage: 0
      }
    
    openWorksheet = (activeSheet) =>{
        this.setState({
            activePage: "dwldWorkSheet",
            worksheet: activeSheet
        });
    }

    getWorksheetList = () => {
        axios.get('https://jsonplaceholder.typicode.com/posts').then(
            response => {
        });
    }
    
    componentDidMount(){
        this.getWorksheetList();    
    }

    worksheetListPaginator = (pageIndex) =>{    
        this.setState({
            currentPage: pageIndex
        });
    }

    render(){
        
        let galleryLeftFilter = null;
        let galleryNav = null;
        let worksheetContent = null;

        if(this.state.activePage === "Gallery"){
            galleryLeftFilter = <GalleryFilter 
                                    title={this.context.galleryFilterLabel}
                                    GalleryFilterHeader={GalleryFilterCSS.GalleryFilterHeader}
                                    GalleryFilterPanel={GalleryFilterCSS.GalleryFilterPanel}
                                    FilterDiv={GalleryFilterCSS.FilterDiv}
                                    FilterLink={GalleryFilterCSS.FilterLink}/>;
            galleryNav = <Fragment>
                <div className={worksheetCSS.GalleryMenuPanel}>
                    <GalleryMenu menuList={this.context.GalleryMenu}/>
                </div>
                <hr/>
            </Fragment>;
            worksheetContent=<Gallery 
                paginatorClickEvent = {this.worksheetListPaginator}
                currentPage={this.state.currentPage} 
                clickEvent={this.openWorksheet} 
                worksheetList={this.context.dummyList}/>;
        }

        if(this.state.activePage === "dwldWorkSheet"){
            const divStyle={padding:"2% 0",fontSize:"12px"};
            galleryNav=<div style={divStyle}>
                Printable Worksheet &gt; Pre School &gt; Science &gt; {this.state.worksheet.title} 
            </div>;
            worksheetContent=<Fragment>
                                <div className={worksheetCSS.WorksheetInfoWrapper}>
                                    <WorksheetInfo {...this.state.worksheet}/>
                                </div>
                                <RelatedResources clickEvent={this.openWorksheet} relatedList={this.context.relatedList}/>
                            </Fragment>
        }

        return(
            <div className={worksheetCSS.WorksheetPanel}>
                <div className={worksheetCSS.LeftADBanner}>
                </div>
                <div className={worksheetCSS.LeftPanel}>
                    {galleryLeftFilter}
                </div>
                <div className={worksheetCSS.GalleryPanel}>
                    <SearchBar searchDiv={worksheetCSS.SearchDiv} searchBar={worksheetCSS.WorksheetSearch}>
                    <i className={"fa fa-search "+worksheetCSS.SearchBarIcon} aria-hidden="true"></i>
                    </SearchBar>
                    {galleryNav}
                    {worksheetContent}
                </div>
                <div className={worksheetCSS.RightADBanner}>
                </div> 
            </div>
        );
    }
}

export default Worksheets;