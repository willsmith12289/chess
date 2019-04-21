move = {
	back: function (i) {
		return { rank: this.back(i), file: this.right(0) };
	},

	forward: function (i) {
		return { rank: this.forward(i), file: this.right(0) };
	},

	right: function (i) {
		return { rank: this.back(0), file: this.right(i) };
	},

	left: function (i) {
		return { rank: this.back(0), file: this.left(i) };
	},

	forwardRight: function (i) {
		return { rank: this.forward(i), file: this.right(i) };
	},

	forwardLeft: function (i) {
		return { rank: this.forward(i), file: this.left(i) };
	},

	backRight: function (i) {
		return { rank: this.back(i), file: this.right(i) };
	},

	backLeft: function (i) {
		return { rank: this.back(i), file: this.left(i) };
	},
}