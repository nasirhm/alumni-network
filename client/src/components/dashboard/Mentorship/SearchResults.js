import React from 'react';
import styled from 'styled-components';
import { ThickPaddedBottom } from '../../../styles/globalStyles';

const ResultItem = styled.div`
  width: 45vw !important;
`;

const ChatIcon = styled.i`
  font-size: 20px !important;
  margin-left: 4px !important;
  margin-bottom: 2px !important;
  transition: color 100ms ease-in-out;
  &:hover {
    cursor: pointer;
    color: rgb(0,225,225);
    transition: color 100ms ease-in-out;
  }
`;

const SearchResults = ({ initiatePrivateChat, currentUser, results, noResults }) => {

  const listResults = results.map(user => {
    return (
      <ResultItem key={user._id} className="item">
        <div className="ui tiny circular image">
          <img src={user.personal.avatarUrl} alt={`${user.username}'s avatar`}/>
        </div>
        <div className="content">
          <div className="header">{user.username}</div>
            { currentUser !== user.username &&
              <ChatIcon
                className="comments icon"
                onClick={ () => { initiatePrivateChat(user.username) }} /> }
          <div className="meta">
            <span><strong>{user.personal.displayName}</strong></span>
            <i className="angle double right icon" />
            <span>{user.mentorship.isMentor ? 'Mentor' : 'Member'}</span>
          </div>
          <div className="description">
            {user.mentorship.mentorshipSkills}
          </div>
        </div>
      </ResultItem>
    );
  });

  const noResultsMessage = (
    <div className="item">
      <div className="ui tiny image">
        <i className="huge teal warning circle icon" />
      </div>
      <div className="middle aligned content">
        <div className="header">
          Bummer man... No results.
        </div>
      </div>
    </div>
  );

  return (
    <ThickPaddedBottom className="ui divided items">
      { !noResults ? listResults : noResultsMessage }
    </ThickPaddedBottom>
  );
}

SearchResults.propTypes = {
  initiatePrivateChat: React.PropTypes.func.isRequired,
  currentUser: React.PropTypes.string.isRequired,
  results: React.PropTypes.array.isRequired,
  noResults: React.PropTypes.bool.isRequired
}

export default SearchResults;