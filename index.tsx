import React, { Component } from 'react';
import { render } from 'react-dom';
import { normalize, schema } from 'normalizr';
import Hello from './Hello';
import './style.css';

interface AppProps {}
interface AppState {
  name: string;
}

var testData = {
  selectedsubreddit: 'frontend',
  postsBySubreddit: {
    frontend: {
      isFetching: true,
      didInvalidate: false,
      items: []
    },
    reactjs: {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: 1439478405547,
      items: [
        {
          id: 42,
          title: 'Confusion about Flux and Relay',
          author: {
            id: 2,
            name: 'Andrew'
          }
        },
        {
          id: 100,
          title:
            'Creating a Simple Application Using React JS and Flux Architecture',
          author: {
            id: 2,
            name: 'Andrew'
          }
        }
      ]
    }
  }
};

var test = () => {
  const user = new schema.Entity('users1');
  const responseSchema = new schema.Object({
    postsBySubreddit: {
      reactjs: {
        items: [
          {
            author: user
          }
        ]
      }
    }
  });
  const normalizedData = normalize(testData, responseSchema);
  console.log('---------normalizedData-------------', normalizedData);
};

var test1 = (index) => {
  let promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(123);
      console.log('--------wait-------------', index);
    }, 3000);           
  });
  promise1.then(
    (data) => {
      console.log('fulfilled--1-', data);
    },
    error => {
      console.log('rejected---', 1);
    }
  );

  Promise.resolve();

  let promise2 = new Promise((resolve, reject)=>{
    setTimeout(() => {
      resolve(234);
      console.log('--------wait2-------------', index + 1);
    }, 4000);        
  }).then((data)=>{
    console.log('fulfilled--2-', data);
  }).catch((error)=>{
    console.log('rejected---', 2);
  });

  Promise.resolve();

  let promise = Promise.race([promise1, promise2]);
  promise.then((data)=>{
    console.log("---all is over---------");
  })

};

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React'
    };
  }

  render() {
    test();
    test1(1);  
    
    return (
      <div>
        <Hello name={this.state.name} />
        <p>Start editing to see some magic happen :)</p>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
