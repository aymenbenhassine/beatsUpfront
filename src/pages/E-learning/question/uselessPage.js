import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PATH_DASHBOARD } from '../../../routes/paths';


export default function Useless() {
    const navigate = useNavigate();
    useEffect(() => {
    navigate(PATH_DASHBOARD.eLearning.addQuestion);
      }, []);

      return(
          <div>
              &nbsp;
          </div>
      );
}