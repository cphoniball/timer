import * as React from 'react';

import Modal from 'global/modal/Modal';

export interface Props {

}

const EditClient: React.SFC<Props> = (props) => {
  return (
      <Modal>
          <div>
              <h2>This is some content inside the modal</h2>
          </div>
      </Modal>
  );
};

export default EditClient;
