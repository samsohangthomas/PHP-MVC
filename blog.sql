-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 20, 2017 at 02:04 PM
-- Server version: 5.5.52
-- PHP Version: 5.6.26RC1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `admin_blog`
--

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `comment` varchar(1000) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id`, `post_id`, `author_id`, `comment`, `created_at`) VALUES
(1, 51, 1, 'Wow ! Virtual Reality is really taking over the wo...', '2016-11-01 00:00:00'),
(3, 57, 2, 'Very Awesome !!!', '2016-12-13 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(25) NOT NULL,
  `message` varchar(1000) NOT NULL,
  `created_at` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `full_name`, `email`, `phone`, `message`, `created_at`) VALUES
(2, 'Thomas Sasmohang', 'samsohangthoma@gmail.com', '9847157845', 'I\'ve come up with the following way to create dynamic query (by adapting some code I found). My question is: can it be improved some way? Is this the most efficient way to do it?', '2016-11-10'),
(3, 'ramesh shree', 'Thoams@gmail.co', '98745784512', 'I\'ve come up with the following way to create dynamic query (by adapting some code I found). My question is: can it be improved some way? Is this the most efficient way to do it?', '2016-11-16'),
(6, 'Test', 'samsohangthomas@yahoo.com', '9841794872', 'ok', '2016-12-14');

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` int(10) UNSIGNED NOT NULL,
  `slug` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `section_one` text COLLATE utf8_unicode_ci NOT NULL,
  `section_two` text COLLATE utf8_unicode_ci NOT NULL,
  `section_three` text COLLATE utf8_unicode_ci NOT NULL,
  `section_four` text COLLATE utf8_unicode_ci NOT NULL,
  `section_five` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `slug`, `section_one`, `section_two`, `section_three`, `section_four`, `section_five`) VALUES
(1, 'contact', 'https://www.twitter.com/', 'https://www.facebook.com/', 'https://www.google.com/', '/xml', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.808407955154!2d85.31743441506173!3d27.69231588279812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19b19295555f%3A0xabfe5f4b310f97de!2sThe+British+College%2C+Kathmandu!5e0!3m2!1sen!2snp!4v1481638915076'),
(2, 'about', '<address><img src="http://samsohangthomas.com.np/public/front/images/logo.png" alt="logo"/>\r\n<p>2015 NGames, inc. Developed in association with MachineGames.It did not matter whether the differences between the censored and uncensored versions were big or small, what mattered was that all gamers around the world should have the right to buy the game as it was originally intended.</p>\r\n</address>\r\n', 'Escape reality and play games |', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `cat_id` int(11) NOT NULL,
  `author_id` int(5) NOT NULL,
  `status` int(11) NOT NULL,
  `isFeatured` tinyint(4) NOT NULL,
  `post_title` varchar(150) NOT NULL,
  `post_content` text NOT NULL,
  `featureImage` varchar(150) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `cat_id`, `author_id`, `status`, `isFeatured`, `post_title`, `post_content`, `featureImage`, `created_at`, `updated_at`) VALUES
(47, 2, 1, 1, 0, 'Oculus offering a $10 million budget for indie games on the Oculus Rift', '<p>Oculus has usedÂ <a href="https://share.oculus.com/" style="-webkit-font-smoothing: antialiased; outline: 0px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-decoration: none; color: rgb(255, 0, 82);" target="_blank">the Oculus Share</a>Â website to allow developers to upload their own experience and demos for the community, and that system will be expanded in the future, but the big news is that the company will be offering $10 million to support indie developers creating content for the Oculus Rift.</p>\r\n\r\n<p>This is great news for smaller teams who have made large bets on virtual reality, and will allow the company to lock up an extensive number of smaller games for its platform when it launches in the first quarter of 2016.</p>\r\n\r\n<p>There was no mechanism shared for how developers can get in touch to ask about funding, but it\'s likely the company has already reached out to many teams in the development community.</p>', 'oculus.jpg\r\n', '2016-01-01', '2016-12-13'),
(49, 1, 1, 1, 1, 'Edge of Nowhere is Insomniac\'s next game, exclusively for Oculus Rift', '<p>Oculus unveiled the controller for its Rift headset today: It\'s a wireless Xbox One controller and will ship with Oculus\' virtual reality headset.</p>', 'edge.jpg', '2016-01-01', '2016-11-21'),
(50, 1, 1, 1, 0, 'Oculus Rift consumer model will ship with Xbox One controller, wireless adapter', '<p>Oculus unveiled the controller for its Rift headset today: It\'s a wireless Xbox One controller and will ship with Oculus\' virtual reality headset.</p>\r\n\r\n<p>Microsoft\'s Xbox One controller will be compatible with Windows 10, thanks to a wireless adapter, the company announced this week. That adapter will be packed in with the Rift.</p>\r\n\r\n<p>Brendan Iribe, Oculus CEO, said that including a gamepad for the consumer version of the Rift is "really important," and called it "the right move for game developers and gamers."</p>\r\n\r\n<p>Oculus hinted that other input devices for Rift might also be announced at today\'s pre-E3 press conference.</p>', 'adapter.jpg\r\n\r\n', '2016-01-01', '2016-11-20'),
(51, 2, 1, 1, 0, 'This is the final, retail Oculus Rift', '<p>Rift is unlike anything youâ€™ve ever experienced. Whether youâ€™re stepping into your favorite game, watching an immersive VR movie, jumping to a destination on the other side of the world, or just spending time with friends in VR, youâ€™ll feel like youâ€™re really there.</p>\r\n\r\n<p>Rift uses state of the art displays and optics designed specifically for VR. Its high refresh rate and low-persistence display work together with its custom optics system to provide incredible visual fidelity and an immersive, wide field of view.</p>', 'rift.jpg\r\n\r\n', '2016-01-01', '2016-11-21'),
(52, 1, 1, 1, 0, 'Oculus pre-E3 event reveals final design, new games, new controller', '<p>At its pre-E3 press conference today, Oculus revealed some of the games coming to its Rift virtual reality headset, including CCP&#39;s&nbsp;<em>Eve Valkyrie</em>,&nbsp;<a href="http://www.polygon.com/2015/6/11/8766681/edge-of-nowhere-insomniac-oculus-rift-exclusive" style="-webkit-font-smoothing: antialiased; outline: 0px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-decoration: none; color: rgb(255, 0, 82);">Insomniac Games&#39;&nbsp;<em>Edge of Nowhere</em></a>and&nbsp;<a href="http://www.polygon.com/2015/6/11/8766995/chronos-oculus-rift-darksiders" style="-webkit-font-smoothing: antialiased; outline: 0px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-decoration: none; color: rgb(255, 0, 82);">Gunfire Games&#39;&nbsp;<em>Chronos</em></a>.</p>\r\n\r\n<p>The company also showed off a handful of other games coming to the Rift, including<em>Damaged Core</em>&nbsp;by High Voltage Software,&nbsp;<em>VR Sports Challenge</em>&nbsp;by Sanzaru Games,&nbsp;<em>Esper</em>&nbsp;from Coatsink and a virtual reality version of&nbsp;<em>Airmech</em>&nbsp;by Carbon Games. For a look at those titles in action, check out Oculus&#39; new sizzle reel above.</p>', 'controller.jpg\r\n\r\n', '2016-01-01', '0000-00-00'),
(53, 1, 1, 1, 1, 'Bloodstained: Ritual of the Night Kickstarter closes with $5.5M in crowdfunding', '<p>TheÂ <a href="https://www.kickstarter.com/projects/iga/bloodstained-ritual-of-the-night/" style="-webkit-font-smoothing: antialiased; outline: 0px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-decoration: none; color: rgb(255, 0, 82);" target="_blank">Kickstarter campaign</a>Â for Koji Igarashi\'s spiritual successor to his brand of Castlevania games,Â <em>Bloodstained: Ritual of the Night</em>, has come to a close with more than $5.5 million in pledges.</p>\r\n\r\n<p>Nearly 65,000 backers kicked in money to help fund the development ofÂ <em>Bloodstained</em>, confirming its status as theÂ <a href="http://www.polygon.com/2015/6/11/8764987/bloodstained-tops-4-25m-becomes-kickstarters-most-funded-video-game" style="-webkit-font-smoothing: antialiased; outline: 0px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-decoration: none; color: rgb(255, 0, 82);">most-funded video game software project on Kickstarter</a>Â by a very comfortable margin.</p>\r\n\r\n<p>In the final two days ofÂ <em>Bloodstained</em>\'s crowdfunding campaign, the game blew past a few more stretch goals. The scope of the project now includes a prequel mini-game for consoles, portables and PC platforms, as well as a roguelike dungeon and a new "boss revenge mode."</p>', 'crowd.jpg', '2016-01-01', '2016-11-20'),
(55, 2, 1, 1, 0, 'Heroes of the Storm:This is your guide to what to buy, and avoid, in the store', '<p><em>Heroes of the Storm</em>&rsquo;s in-game currency is called gold, and you earn it by playing games, hitting level milestones, and completing daily quests.&nbsp; A few months ago, during the beta,<a href="http://www.polygon.com/2015/2/4/7977165/heroes-of-the-storm-guide" style="-webkit-font-smoothing: antialiased; outline: 0px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-decoration: none; color: rgb(255, 0, 82);">I wrote a fairly in-depth guide to maximizing gold income in Heroes</a>, but here are the basics:</p>\r\n\r\n<p>When you play games, you earn experience points, which accrue to both your overall account and the hero you are using. The heroes and the player account each have levels independent of each other; even if your account is a high level, you&rsquo;ll start from scratch when you try a new hero.</p>\r\n\r\n<p>As you level from 1 to 40, you&rsquo;ll get 16,000 gold for hitting certain milestones, and you can get 500 gold for each hero you use enough to reach level 5. There is a weekly rotation of free heroes that cycles through all the characters, so you don&rsquo;t have to buy the heroes to earn these bonuses.</p>', 'storm.jpg', '2016-01-01', '0000-00-00'),
(56, 2, 1, 1, 0, 'Scalebound and Crackdown for Xbox One skipping E3, will show up at Gamescom', '<p>In the final days leading up to E3 2015, the head of Xbox warned fans that two high profile Xbox One games won&#39;t be appearing at the show: Platinum Games&#39;&nbsp;<em>Scalebound</em>&nbsp;and Microsoft Studios&#39;&nbsp;<a href="http://www.polygon.com/2014/6/9/5793578/crackdown-heading-to-xbox-one" style="-webkit-font-smoothing: antialiased; outline: 0px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-decoration: none; color: rgb(255, 0, 82);">new&nbsp;<em>Crackdown</em></a>. Instead, those games will crop up at Gamescom in Germany this August.</p>\r\n\r\n<p>&quot;Having a jam-packed lineup of games to show at E3 means that there simply isn&#39;t enough time to give each of our upcoming titles its well-deserved time in the spotlight,&quot; Microsoft&#39;s Phil Spencer wrote on&nbsp;<a href="http://news.xbox.com/2015/06/xbox-looking-toward-e3-and-beyond" style="-webkit-font-smoothing: antialiased; outline: 0px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-decoration: none; color: rgb(255, 0, 82);" target="_blank">Xbox Wire</a>. &quot;We&#39;ve decided to save some of our most eagerly-awaited future titles for gamescom in August. Rest assured that titles like<em>Crackdown</em>,&nbsp;<em>Quantum Break</em>&nbsp;and&nbsp;<em>Scalebound</em>&nbsp;will be front and center at gamescom along with new game reveals for both Xbox One and Windows 10.&quot;</p>', 'e3.jpg', '2016-01-01', '0000-00-00'),
(57, 2, 2, 1, 1, 'Tales of Zestiria is coming to PS4, PC Oct. 20', '<p>The latest entry in the Tales series,Â <em>Tales of Zestiria</em>, is heading to PlayStation 4 and Windows PC on Oct. 2, according to aÂ <a href="https://twitter.com/BandaiNamcoUS/status/609360760733433857" style="-webkit-font-smoothing: antialiased; outline: 0px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-decoration: none; color: rgb(255, 0, 82);">tweet</a>Â from the official Bandai Namco US Twitter account. The game was previously only announced for PlayStation 3.</p>\r\n\r\n<p><em>Tales of Zestiria</em>Â launched earlier this year in Japan; it stars a young man named Sorey, who isÂ "destined to unite both humans and the Seraphs, legendary beings that roam the earth invisible to mankind." Like previous titles,Â <em>Tales of Zestiria</em>Â includes real-time battles and a huge world to explore.</p>\r\n\r\n<p>According to theÂ <a href="http://blog.eu.playstation.com/2015/06/12/tales-of-zestiria-arrives-on-ps4-this-october/" style="-webkit-font-smoothing: antialiased; outline: 0px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-decoration: none; color: rgb(255, 0, 82);">PlayStation Blog Europe</a>, the game comes to Europe on Oct. 16. The PC digital version will be available Oct. 20. You can watch the European trailer above.</p>', 'zes.jpg', '2016-01-01', '2016-11-20'),
(58, 2, 2, 1, 1, 'YouTube launching its own dedicated gaming app and website, YouTube Gaming', '<p>Google will launch YouTube Gaming, the streaming video site\'s gaming-focused service, Aug. 26 on the web and in dedicated Android and iOS apps, Google announced today.</p>\r\n\r\n<p>YouTube Gaming, which YouTube and parent company GoogleÂ <a href="http://www.polygon.com/2015/6/12/8772143/youtube-gaming-app-channel" style="-webkit-font-smoothing: antialiased; outline: 0px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-decoration: none; color: rgb(255, 0, 82);">announced in June</a>, is meant to be a one-stop shop for people looking for gaming video content. The service automatically collects all gaming-related videos as well as livestreams on individual pages for more than 25,000 different games. It will also provide users with personalized recommendations based on the pages and channels they follow.</p>\r\n\r\n<p>In addition, Google wants to make it easier for people to livestream games on YouTube. A new page atÂ <a href="https://www.youtube.com/stream" style="-webkit-font-smoothing: antialiased; outline: 0px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-decoration: none; color: rgb(255, 0, 82);" target="new">youtube.com/stream</a>, which is currently in beta, provides a streamlined process to start streaming at a personal URL.</p>', 'app.jpg', '2016-01-01', '2016-11-20');

-- --------------------------------------------------------

--
-- Table structure for table `post_category`
--

CREATE TABLE `post_category` (
  `id` int(11) NOT NULL,
  `category_name` varchar(150) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `post_category`
--

INSERT INTO `post_category` (`id`, `category_name`, `status`) VALUES
(1, 'news', 0),
(2, 'review', 1);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `role`) VALUES
(1, 'Super Admin'),
(2, 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(1000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `created_at` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role_id`, `status`, `full_name`, `email`, `password`, `avatar`, `created_at`) VALUES
(1, 1, 1, 'Thomas Samsohang', 'superadmin@gmail.com', '21232f297a57a5a743894a0e4a801fc3', 'thomas.jpg', '2016-11-01'),
(15, 2, 1, 'Ã†Samsohang Thomas D. Luffy', 'admin@gmail.com', '21232f297a57a5a743894a0e4a801fc3', '', '2016-12-30'),
(16, 3, 1, 'Rupesh Shrestha', 'user@gmail.com', '21232f297a57a5a743894a0e4a801fc3', '', '2016-12-30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cat_id` (`cat_id`);

--
-- Indexes for table `post_category`
--
ALTER TABLE `post_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;
--
-- AUTO_INCREMENT for table `post_category`
--
ALTER TABLE `post_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
