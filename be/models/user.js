import { db } from '../db'
import _ from 'lodash'

export const User = class {
  constructor(attrs) {
		this.localAttrs = attrs;
  }

	get local() {
		return this.localAttrs;
	}

	isCompanyEmail() {
		if (_.isNil(this.localAttrs.email)) {
			return false;
		}

		let prefix = null;
		let domain = null;
		[prefix, domain] = this.localAttrs.email.split(/\@/);

		if (!_.isNil(domain) && domain === 'greenseedtech.com') {
			return true;

		} else {
			return false;
		}
	}

	generateHash(password) {
		return password;
	}

	validPassword(password) {
		return (this.localAttrs.password === password);
	}

	save(callback) {
		const self = this;

		db('local_passport').insert(this.localAttrs)
		.asCallback(function(err, rowIds) {
		console.log(['save', self.localAttrs, err, rowIds])
			if (err) return callback(err);

			callback(null, rowIds);
		})
	}
	
	static findById(id, callback) {

		// console.log(['findOne:id', id]);
		db('local_passport').where({id})
		.asCallback(function(err, rows) {
			if (err) return callback(err);

			// console.log(['findById:local_passport:rows', rows]);

			if (rows.length < 1) {
				callback(null, null);
				return;
			}

			// const user = new User({id: 1, email: 'dcvezzani@gmail.com', password: 'pass'});
			const user = new User(rows[0]);
			callback(null, user);
		})
	}

	static findOne(attrs, callback) {

		// console.log(['findOne:attrs', attrs]);
		db('local_passport').where(attrs)
		.asCallback(function(err, rows) {
			if (err) return callback(err);

			// console.log(['findOne:local_passport:rows', rows, rows[0]]);

			if (rows.length < 1) {
				callback(null, null);
				return;
			}
	
			// const user = new User({id: 1, email: 'dcvezzani@gmail.com', password: 'pass'});
			const user = new User(rows[0]);
			callback(null, user);
		})
	}
}
