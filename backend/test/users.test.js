/* eslint-disable func-names */
require('dotenv').config();
const chai = require('chai');
const sinon = require('sinon');

const user = require('../services/user');
const db = require('../sql/db');

const { expect } = chai;
const { stub } = sinon;

describe('module authenticateUser', () => {
  afterEach(() => {
    sinon.restore();
  });

  beforeEach(function () {
    sinon.restore();
    this.queryStub = stub(db, 'query').resolves({
      rowCount: 0,
      rows: [],
    }); // remplace la fonction "query" de "../sql/db"
  });

  it('should throw an error if query fail', async function () {
    this.queryStub.rejects(new Error('Error')); // lors de l'appel "db.query" une erreur sera émise
    try {
      await user.authenticateUser('toto@toto.fr', 'tata');
    } catch (err) {
      expect(err.message).to.equal('Error');
      expect(this.queryStub.callCount).to.equal(1); // "query" est bien appelé
      return;
    }
    throw new Error('Should have thrown an error');
  });

  it('should throw an error if query return 0 row', async function () {
    try {
      await user.authenticateUser('toto@toto.fr', 'tata');
    } catch (err) {
      expect(err.message).to.equal('Email or password is incorrect'); // Si la requête de renvoi pas de résultat alors une erreur "bad credentials" est émise
      expect(this.queryStub.callCount).to.equal(1);
      return;
    }
    throw new Error('Should have thrown an error');
  });

  it('should succeed', async function () {
    this.queryStub.resolves({ rowCount: 1, rows: [{ email: 'toto@toto.fr' }] });
    const authUser = await user.authenticateUser('toto@toto.fr', 'tata');
    expect(authUser.email).to.equal('toto@toto.fr');
    // expect(this.stubGetCompanies.callCount).to.equal(0);
  });
});

describe('module get user', () => {
  afterEach(() => {
    sinon.restore();
  });

  beforeEach(function () {
    sinon.restore();
    this.queryStub = stub(db, 'query').resolves({
      rowCount: 0,
      rows: [],
    }); // remplace la fonction "query" de "../sql/db"
  });

  it('should throw an error if user does not exist', async function() {
    try {
      await user.getUser(1);
    } catch (err) {
      expect(err.message).to.equal('User does not exist');
      expect(this.queryStub.callCount).to.equal(1);
      return;
    }
    throw new Error('Should have thrown an error');
  });

  it('should succeed', async function () {
    this.queryStub.resolves({
      rowCount: 1,
      rows: [{ email: 'toto@toto.fr' }]
    });
    const result = await user.getUser(1);
    expect(result.email).to.equal('toto@toto.fr');
  });
});

describe('module list user', () => {
  afterEach(() => {
    sinon.restore();
  });

  beforeEach(function () {
    sinon.restore();
    this.queryStub = stub(db, 'query').resolves({
      rowCount: 0,
      rows: [],
    }); // remplace la fonction "query" de "../sql/db"
  });

  it('should throw an error if user does not exist', async function() {
    try {
      await user.listUser();
    } catch (err) {
      console.log(err);
      expect(err.message).to.equal('User does not exist');
      expect(this.queryStub.callCount).to.equal(1);
      return;
    }
    throw new Error('Should have thrown an error');
  });

  it('should succeed', async function () {
    this.queryStub.resolves({
      rowCount: 1,
      rows: [{ email: 'toto@toto.fr' }]
    });
    const result = await user.listUser(1);
    expect(result[0].email).to.equal('toto@toto.fr');
  });
});
