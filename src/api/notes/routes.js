const routes = (h) => ([
  {
    method: 'POST',
    path: '/notes',
    handler: h.postNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: h.getAllNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: h.getNoteByIdHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: h.editNoteByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: h.deleteNoteByIdHandler,
  },
]);

module.exports = routes;
