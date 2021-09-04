import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {

    static defaultProps = {
            pageSize: 8,
            country: 'in',
            category:'science'
    }

    static propTypes = {
        pageSize: PropTypes.number,
        country: PropTypes.string,
        category: PropTypes.string,
    }
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    // Creating a function upDate news which we can use in our required functions
    async upDateNews(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=819bf47e4f8f4e9fa0ae40b82705567c&page=${this.props.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading:false });
    }

    //This function will run after the render function
    async componentDidMount() {
        this.upDateNews();
    }

    //This is the previous button function
    handleOnPrev = async () => {
        this.upDateNews();
        this.setState({
            page: this.state.page - 1,
        })
    }

        //This is the next button function
    handleOnNext = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.page.totalResults / this.props.pageSize)) {}
        else {
            this.upDateNews();
            this.setState({
                page: this.state.page + 1,
            })
        }
    }


    render() {
        return (
            <>
                <div className="container my-3" style={{ margin: '23px' }}>
                    <h2 className="text-center"><b>Top headlines - created with ReactJS</b></h2><hr /><br />
                   {this.state.loading && <Spinner/>}  
                    <div className="row">
                        { !this.state.loading && this.state.articles.map((element) => {
                            return <div key={element.url} className="col-md-4">
                                <NewsItem title={element.title} description={element.description} newsUrl={element.url} imageUrl={element.urlToImage} author={!element.author? "unknown":element.author} publishedAt={new Date (element.publishedAt).toGMTString()} source = {element.source.name} />
                            </div>
                        })
                        }
                    </div>
                    {/* //Adding buttons */}
                    <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-info" onClick={this.handleOnPrev}>&larr;Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-info" onClick={this.handleOnNext}>Next&rarr;</button>
                    </div>
                </div>
            </>
        )
    }
}

export default News
