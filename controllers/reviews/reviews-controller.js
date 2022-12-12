import * as dao from "./reviews-dao.js"

const ReviewsController = (app) => {
    const createReview = async (req, res) => {
        const review = req.body
        const currentUser = req.session['currentUser']
        review.author = currentUser._id
        const actualReview = await dao.createReview(review)
        res.json(actualReview)
    }
    const findReviewsByMovie = async (req, res) => {
        const sid = req.params.sid
        const reviews = await dao.findReviewsBySong(sid)
        res.json(reviews)
    }
    const findReviewsByUser = async (req, res) => {
        const user = req.params.uid
        const reviews = await dao.findReviewsByUser(user)
        res.json(reviews)
    }
    app.post('/songs/reviews', createReview)
    app.get('/songs/reviews/:sid', findReviewsByMovie)
    app.get('/reviews/users/:uid', findReviewsByUser)
}
export default ReviewsController