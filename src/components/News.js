import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    static defaultProps = {
        pageSize: 8,
        country: 'in',
        category: 'science'
    }

    static propTypes = {
        pageSize: PropTypes.number,
        country: PropTypes.string,
        category: PropTypes.string,
    }

    //Capitalize function to capital the first letter of our title(category)
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
        }
        document.title = `News app - ${this.capitalizeFirstLetter(this.props.category)} `;
    }

    // Creating a function upDate news which we can use in our required functions
    async upDateNews() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=819bf47e4f8f4e9fa0ae40b82705567c&page=${this.props.page}&pagSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(40)
        let parsedData = await data.json();
        console.log(parsedData);
        this.props.setProgress(70)
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false });
        this.props.setProgress(100);
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
        if (this.state.page + 1 > Math.ceil(this.state.page.totalResults / this.props.pageSize)) { }
        else {
            this.upDateNews();
            this.setState({
                page: this.state.page + 1,
            })
        }
    }

    fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=819bf47e4f8f4e9fa0ae40b82705567c&page=${this.props.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            page: this.state.page + 1
        });
    }


    render() {
        return (
            <>
                <h2 className="text-center my-3 container"><b>{`Top headlines - ${this.capitalizeFirstLetter(this.props.category)}`}</b></h2><hr /><br />
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">

                        <div className="row ">
                            {this.state.articles.map((element) => {
                                return <div key={element.url} className="col-md-4">
                                    <NewsItem title={element.title} description={element.description} newsUrl={element.url} imageUrl={element.urlToImage} author={!element.author ? "unknown" : element.author} publishedAt={new Date(element.publishedAt).toGMTString()} source={element.source.name} />
                                </div>
                            })
                            }
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}

export default News
