import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateSearchParams } from 'appRedux/modules/speaker';

import { topicLinks } from '../styles.css';

const Topics = ({ history, topics, updateSearchParams }) => {
  const onTopicClick = topic => event => {
    event.preventDefault();
    const home = '/';
    if (history.location.pathname !== home) {
      history.push(home)
    }

    updateSearchParams({
      q: topic,
      offset: 0,
      limit: 20,
      append: false,
    });
  };

  return (
    <div className={topicLinks}>
      {
        topics.map(topic => (
          <a
            href={'#'}
            key={topic.topic}
            onClick={onTopicClick(topic.topic)}
          >
            {topic.topic}
          </a>
        ))
        .reduce((prev, curr) => [prev, ', ', curr])
      }
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    updateSearchParams: params => {
      dispatch(updateSearchParams(params));
    },
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Topics));