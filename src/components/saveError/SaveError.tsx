import { FC } from 'react';

import error from '../../resourses/error.gif';

import './saveError.scss';

const SaveError: FC = () => {
  return (
    <div className="error">
      <img src={error} alt="Error" />
      <div className="error__message">
        Ooops... Something went wrong! Please, reload the page
      </div>
    </div>
  );
};

export default SaveError;
