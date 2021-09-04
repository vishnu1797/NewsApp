import React, { Component } from 'react';


export default class NewsItem extends Component {


    render() {
        let { title, description, imageUrl, newsUrl, source, author, publishedAt } = this.props;

        return (
            <>
                <div>
                    <div className=" container card" style={{ width: '18rem' }}>
                        <img src={!imageUrl ? "https://images.livemint.com/img/2021/09/02/600x338/startup-kElG--621x414@LiveMint_1630581046154.jpg" : imageUrl} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{title}... <span className="badge rounded-pill bg-primary">{source}</span></h5>
                            <p className="card-text">{description}...</p>
                            <a href={newsUrl} target="_blank" className="btn btn-dark" rel="noreferrer">Read more</a>
                            <p className="card-text">By {author} on {publishedAt}</p>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}
