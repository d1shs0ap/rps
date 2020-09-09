import React from 'react';
import { Row, Col } from 'antd';

import LogoutButton from './logoutButton';
import { useAuth0 } from '@auth0/auth0-react';

const NavBar = () => {

  const { user } = useAuth0();

  return <>
    <Row style={{ margin: '15px' }} justify='end'>
      <Col style={{ marginLeft: '15px', marginRight: '15px', marginTop: '5px' }}>
        {user['https://matthewyng.com/username']}
      </Col>
      <Col>
        <LogoutButton></LogoutButton>
      </Col>
    </Row>
  </>
}

export default NavBar;