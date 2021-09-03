import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner'

export class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=bd4354274b0f402d9829f49b956a3346&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading:false });
    }

    handleOnPrev = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=bd4354274b0f402d9829f49b956a3346&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading:false
        })
    }

    handleOnNext = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.page.totalResults / this.props.pageSize)) {

        }
        else {
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=bd4354274b0f402d9829f49b956a3346&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading: true})
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
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
                        { !this.state.loading&&this.state.articles.map((element) => {
                            return <div key={element.url} className="col-md-4">
                                <NewsItem title={element.title} description={element.description} newsUrl={element.url} imageUrl={element.urlToImage} />
                            </div>
                        })
                        }
                    </div>
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
