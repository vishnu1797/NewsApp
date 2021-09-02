import React, { Component } from 'react'
import NewsItem from './NewsItem';


export class News extends Component {




    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page:1
        }
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=bd4354274b0f402d9829f49b956a3346&page=1`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({ articles: parsedData.articles });
    }

    handleOnPrev = async () => {
        console.log('Clicken on Previous')
    }

    handleonNext = async () => {
        console.log('Clicken on Next')
    }


    render() {
        return (
            <>
                <div className="container my-3" style={{ margin: '23px' }}>
                    <h2><b>Top headlines from vishnu</b></h2>
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4">
                                <NewsItem title={element.title} description={element.description} newsUrl={element.url} imageUrl={element.urlToImage} />
                            </div>
                        })
                        }
                    </div>
                    <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" class="btn btn-info" onClick={this.handleOnPrev}>&larr;Previous</button>
                        <button type="button" class="btn btn-info" onClick={this.handleonNext}>Next&rarr;</button>
                    </div>
                </div>
            </>
        )
    }
}

export default News
