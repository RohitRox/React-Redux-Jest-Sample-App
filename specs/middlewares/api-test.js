import nock from 'nock';

jest.dontMock(`${ __APPDIR__ }/middlewares/api`);
const Api  = require(__APPDIR__ + '/middlewares/api');

describe('api middleware', () => {
  let dispatch, apiDispatch;

  beforeEach( () => {
    dispatch = jasmine.createSpy();
    apiDispatch = Api()(dispatch);
  });


  describe('actions without request payload', () => {
    it('dispatches the action', () => {
      const action = {
        type: "ANY_ACTION",
      };
      apiDispatch(action);

      expect(
        dispatch
      ).toHaveBeenCalledWith(action);
    });
  });

  describe('actions with request payload', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    describe('request success', () => {
      it('dispatches the action success', () => {
        const payload = { data: ['hash-of-data'] };
        nock('http://example.com/')
        .get('/whatever')
        .reply(200, payload)

        const action = {
          type: "ANY_ACTION",
          request: {
            url: 'http://example.com/whatever'
          }
        };

        runs( () =>{
          apiDispatch(action)
        });

        waitsFor( () => {
          return dispatch.calls.length === 2;
        }, 1000);

        runs( () => {
          expect(
            dispatch
          ).toHaveBeenCalledWith({
            type: 'ANY_ACTION'
          });
          expect(
            dispatch
          ).toHaveBeenCalledWith({
            type: 'ANY_ACTION_SUCCESS',
            payload: payload,
            requestData: undefined
          });
        });
      });
    });

    describe('request fails', () => {
      it('dispatches the action error', () => {
        const payload = { message: 'You missed something' };
        nock('http://example.com/')
        .get('/whatever')
        .replyWithError(payload)

        const action = {
          type: "ANY_ACTION",
          request: {
            url: 'http://example.com/whatever'
          }
        };

        runs( () =>{
          apiDispatch(action)
        });

        waitsFor( () => {
          return dispatch.calls.length === 2;
        }, 1000);

        runs( () => {
          expect(
            dispatch
          ).toHaveBeenCalledWith({
            type: 'ANY_ACTION'
          });
          expect(
            dispatch
          ).toHaveBeenCalledWith({
            type: 'ANY_ACTION_ERROR',
            error : `request to http://example.com/whatever failed, reason: ${payload.message}`,
            status: 0
          });
        });
      });
    });

  });

});
