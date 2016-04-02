'use strict';

describe('Server', () => {
  /** Test Models **/
  require('./models/model-access-token');
  require('./models/model-user');
  require('./models/model-task');
  require('./models/model-message');
  
  /** Test Routes **/
  require('./routes/routes-user');
  require('./routes/routes-task');
  require('./routes/routes-message');
});
