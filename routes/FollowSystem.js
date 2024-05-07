const  express=require('express');
 const router =express.Router();
  const User=require( '../models/Signup')

 router.post('/:userId/follow', async (req, res) => {
    const userId = req.params.userId;
    const followUserId = req.body.followUserId;

    try {
        await User.findByIdAndUpdate(userId, { $addToSet: { following: followUserId } });
        await User.findByIdAndUpdate(followUserId, { $addToSet: { followers: userId } })
        res.status(200).json({ message: 'User followed successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to follow user' });
    }
});

// router.post('/:userId/followback', async (req, res) => {
//     const userId = req.params.userId;
//     const followUserId = req.body.followUserId;

//     try {
//         const user = await User.findById(userId);
//         if (!user.followers.includes(followUserId)) {
//             await User.findByIdAndUpdate(userId, { $addToSet: { followers: followUserId } });

//             const followUser = await User.findById(followUserId);
//             if (followUser.followers.includes(userId)) {
//                 await User.findByIdAndUpdate(followUserId, { $pull: { followers: userId } });
//             }
//         }

//         res.status(200).json({ message: 'User followed successfully' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Failed to follow user' });
//     }
// });



router.get('/:userId/following', async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId).populate('following', 'firstname lastname  email imageUrl');
        res.status(200).json(user.following);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to get following list' });
    }
});


router.get('/:userId/followers', async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId).populate('followers', 'firstname lastname email imageUrl');
        res.status(200).json(user.followers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to get followers list' });
    }
});





  module.exports=router