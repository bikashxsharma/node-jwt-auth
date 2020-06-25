const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../modules/User')
const { registerValidation, loginValidation } = require('../validation')




// all the routes here get /api/user prefix
router.post('/register', async (req, res) => {
  //validate data before saving
  const error = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // check if user email already exists

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send('Email already exist, enter new or try login')

  //password hash
  const salt = await bcrypt.genSaltSync(10)
  const passwordHash = await bcrypt.hashSync(req.body.password, salt)

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: passwordHash,
  })
  try {
    const savedUser = await user.save();
    res.send({ user: user._id })
  } catch (err) {
    res.status(400).send(err)
  }
})

// login route
router.post('/login', async (req, res) => {
  //validate data before auth starts
  const error = await loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // checking if email is correct 
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('User email does not exist')
  // check if password is correct
  const validatePassword = await bcrypt.compare(req.body.password, user.password)
  if (!validatePassword) return res.status(400).send("Password incorrect")

  // authorization token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.header('auth-token', token).send(token)
})

module.exports = router;