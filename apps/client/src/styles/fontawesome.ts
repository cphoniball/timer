import { library } from '@fortawesome/fontawesome-svg-core';
// import { faPen } from '@fortawesome/free-regular-svg-icons';
import { faPencilAlt, faTrashAlt  } from '@fortawesome/free-solid-svg-icons';

function createIconLibrary() {
    library.add(faTrashAlt);
    library.add(faPencilAlt);
}

export default createIconLibrary;
