import { ClueInfo, FeedbackEvaluation, FeedbackItem, FeedbackSeverity, PracticeLearningStatus, VocabularyWord } from '../types';

// Extended English lexicon for spell checking
const BASE_DICTIONARY = [
  // A
  'a', 'about', 'above', 'accept', 'access', 'accomplish', 'according', 'account', 'accurate',
  'achieve', 'across', 'act', 'action', 'active', 'actually', 'adapt', 'add', 'addition', 'address',
  'adequate', 'adjust', 'admit', 'adopt', 'adult', 'advance', 'advantage', 'advice', 'advise',
  'afraid', 'after', 'afternoon', 'again', 'against', 'age', 'agency', 'agenda', 'agent', 'ago',
  'agree', 'agreement', 'ahead', 'aid', 'aim', 'air', 'airline', 'airport', 'alarm', 'album',
  'all', 'allow', 'almost', 'alone', 'along', 'already', 'also', 'alternative', 'although',
  'always', 'am', 'amazing', 'among', 'amount', 'analysis', 'analyze', 'anchor', 'and', 'anger',
  'animal', 'announce', 'annual', 'another', 'answer', 'anticipate', 'anxious', 'any', 'anybody',
  'anyone', 'anything', 'anyway', 'anywhere', 'apart', 'apartment', 'apparent', 'apparently',
  'appeal', 'appear', 'appearance', 'apple', 'apples', 'application', 'apply', 'appoint', 'appointment', 'appreciate',
  'approach', 'appropriate', 'approval', 'approve', 'approximate', 'april', 'area', 'aren\'t',
  'argue', 'argument', 'arise', 'arm', 'around', 'arrange', 'arrangement', 'arrest', 'arrival',
  'arrive', 'art', 'article', 'artist', 'as', 'ask', 'aspect', 'assess', 'assessment', 'asset',
  'assign', 'assignment', 'assist', 'assistance', 'assistant', 'associate', 'association',
  'assume', 'assumption', 'assure', 'at', 'athlete', 'atmosphere', 'attach', 'attack', 'attempt',
  'attend', 'attention', 'attitude', 'attorney', 'attract', 'attractive', 'attribute', 'audience',
  'august', 'author', 'authority', 'automate', 'automatic', 'automatically', 'available', 'average',
  'avoid', 'award', 'aware', 'awareness', 'away', 'awesome',
  // B
  'baby', 'back', 'background', 'bad', 'badly', 'bag', 'bake', 'balance', 'ball', 'ban', 'banana', 'bananas', 'band',
  'bank', 'bar', 'barely', 'base', 'basic', 'basically', 'basis', 'basket', 'battery', 'be',
  'beach', 'bear', 'beat', 'beautiful', 'beauty', 'because', 'become', 'bed', 'bedroom', 'before',
  'begin', 'beginning', 'behalf', 'behave', 'behavior', 'behind', 'belief', 'believe', 'belong',
  'below', 'belt', 'bench', 'bend', 'beneath', 'benefit', 'beside', 'besides', 'best', 'better',
  'between', 'beyond', 'bicycle', 'bid', 'big', 'bike', 'bill', 'billion', 'bind', 'biology',
  'bird', 'birth', 'birthday', 'bit', 'bite', 'black', 'blade', 'blame', 'blank', 'blend',
  'block', 'blood', 'blow', 'blue', 'board', 'boat', 'body', 'boil', 'bomb', 'bond', 'bone',
  'bonus', 'book', 'boom', 'boost', 'boot', 'border', 'born', 'borrow', 'boss', 'both', 'bother',
  'bottle', 'bottom', 'boundary', 'bowl', 'box', 'boy', 'brain', 'branch', 'brand', 'bread',
  'break', 'breakfast', 'breast', 'breath', 'breathe', 'brick', 'bridge', 'brief', 'briefly',
  'bright', 'brilliant', 'bring', 'broad', 'broadcast', 'brother', 'brown', 'brush', 'budget',
  'build', 'building', 'bullet', 'bunch', 'burden', 'burn', 'bury', 'bus', 'business', 'busy',
  'but', 'butter', 'button', 'buy', 'buyer', 'by',
  // C
  'cabin', 'cabinet', 'cable', 'cake', 'calculate', 'calendar', 'call', 'calm', 'camera',
  'camp', 'campaign', 'campus', 'can', 'can\'t', 'cancel', 'cancer', 'candidate', 'cannot',
  'cap', 'capability', 'capable', 'capacity', 'capital', 'captain', 'capture', 'car', 'carbon',
  'card', 'care', 'career', 'careful', 'carefully', 'cargo', 'carrier', 'carry', 'case', 'cash',
  'cast', 'cat', 'catch', 'category', 'cater', 'cause', 'ceiling', 'celebrate', 'celebration',
  'cell', 'center', 'central', 'century', 'ceremony', 'certain', 'certainly', 'chain', 'chair',
  'chairman', 'challenge', 'chamber', 'champion', 'championship', 'chance', 'change', 'channel',
  'chapter', 'character', 'characteristic', 'characterize', 'charge', 'charity', 'chart',
  'chase', 'cheap', 'check', 'cheek', 'cheese', 'chef', 'chemical', 'chemistry', 'chest', 'chew',
  'chicken', 'chief', 'child', 'childhood', 'children', 'chip', 'chocolate', 'choice', 'choose',
  'church', 'cigarette', 'circle', 'circumstance', 'cite', 'citizen', 'city', 'civil', 'claim',
  'clarification', 'clarify', 'clarified', 'clarifying', 'clarifies', 'class', 'classic',
  'classroom', 'clean', 'clear', 'clearly', 'clerk', 'clever', 'click', 'client', 'climate',
  'climb', 'clinic', 'clinical', 'clock', 'close', 'closely', 'closer', 'closest', 'closet',
  'cloth', 'clothes', 'clothing', 'cloud', 'club', 'clue', 'cluster', 'coach', 'coal', 'coast',
  'coat', 'code', 'coffee', 'cognitive', 'cold', 'collaborate', 'collaborated', 'collaborating',
  'collaboration', 'collaborative', 'collapse', 'colleague', 'collect', 'collection', 'collective',
  'college', 'colonial', 'color', 'column', 'combine', 'combination', 'come', 'comfort',
  'comfortable', 'command', 'commander', 'comment', 'commercial', 'commission', 'commit',
  'commitment', 'committee', 'common', 'commonly', 'communicate', 'communication', 'community',
  'company', 'compare', 'comparison', 'compel', 'compete', 'competition', 'competitive',
  'competitor', 'complain', 'complaint', 'complete', 'completely', 'completion', 'complex',
  'complexity', 'compliance', 'complicated', 'component', 'compose', 'composition', 'comprehensive',
  'computer', 'concentrate', 'concentration', 'concept', 'concern', 'concerned', 'concert',
  'conclude', 'conclusion', 'concrete', 'condition', 'conduct', 'conference', 'confidence',
  'confident', 'confirm', 'confirmation', 'conflict', 'confront', 'confusion', 'congress',
  'connect', 'connection', 'conscious', 'consciousness', 'consensus', 'consent', 'consequence',
  'conservative', 'consider', 'considerable', 'consideration', 'consist', 'consistent', 'consistently',
  'constant', 'constantly', 'constitute', 'constitutional', 'construct', 'construction', 'consult',
  'consultant', 'consume', 'consumer', 'consumption', 'contact', 'contain', 'container',
  'contemporary', 'content', 'contest', 'context', 'continent', 'continue', 'continued',
  'continuous', 'contract', 'contrast', 'contribute', 'contribution', 'control', 'controversial',
  'controversy', 'convenience', 'convenient', 'conveniently', 'convention', 'conventional',
  'conversation', 'convert', 'convey', 'convince', 'cook', 'cookie', 'cooking', 'cool',
  'cooperate', 'cooperation', 'coordinate', 'coordinator', 'cop', 'cope', 'copy', 'core',
  'corn', 'corner', 'corporate', 'corporation', 'correct', 'correctly', 'correction', 'correspond',
  'cost', 'cotton', 'couch', 'could', 'couldn\'t', 'council', 'counsel', 'counselor', 'count',
  'counter', 'country', 'county', 'couple', 'courage', 'course', 'court', 'cousin', 'cover',
  'coverage', 'cow', 'crack', 'craft', 'crash', 'crazy', 'cream', 'create', 'creation',
  'creative', 'creativity', 'creature', 'credit', 'crew', 'crime', 'criminal', 'crisis',
  'criteria', 'critic', 'critical', 'criticism', 'criticize', 'crop', 'cross', 'crowd', 'crucial',
  'cry', 'cultural', 'culture', 'cup', 'curious', 'current', 'currently', 'curriculum', 'curtain',
  'curve', 'custom', 'customer', 'cut', 'cycle',
  // D
  'dad', 'daily', 'damage', 'dance', 'danger', 'dangerous', 'dare', 'dark', 'darkness', 'data',
  'database', 'date', 'daughter', 'day', 'days', 'dead', 'deadline', 'deadlines', 'deal', 'dealer',
  'dear', 'death', 'debate', 'debt', 'decade', 'decide', 'decision', 'deck', 'declare', 'decline',
  'decrease', 'deep', 'deeply', 'deer', 'defeat', 'defend', 'defendant', 'defense', 'defensive',
  'deficit', 'define', 'definitely', 'definition', 'degree', 'delay', 'delegate', 'delegated',
  'delegating', 'delegation', 'deliver', 'delivery', 'demand', 'democracy', 'democrat', 'democratic',
  'demonstrate', 'demonstration', 'denial', 'deny', 'department', 'depend', 'dependent',
  'depending', 'depict', 'deploy', 'depression', 'depth', 'deputy', 'derive', 'describe',
  'description', 'desert', 'deserve', 'design', 'designer', 'desire', 'desk', 'desperate',
  'despite', 'destroy', 'destruction', 'detail', 'detailed', 'detect', 'determine', 'develop',
  'developer', 'developing', 'development', 'device', 'devote', 'dialogue', 'diet', 'differ',
  'difference', 'different', 'differently', 'difficult', 'difficulty', 'dig', 'digital', 'dimension',
  'dinner', 'direct', 'direction', 'directly', 'director', 'dirt', 'dirty', 'disability',
  'disagree', 'disappear', 'disaster', 'discipline', 'discourse', 'discover', 'discovery',
  'discrimination', 'discuss', 'discussed', 'discussing', 'discussion', 'disease', 'dish',
  'dismiss', 'disorder', 'display', 'dispute', 'distance', 'distant', 'distinct', 'distinction',
  'distinguish', 'distribute', 'distribution', 'district', 'diverse', 'diversity', 'divide',
  'division', 'divorce', 'dna', 'do', 'doctor', 'document', 'documentation', 'does', 'doesn\'t',
  'dog', 'domestic', 'dominant', 'dominate', 'don\'t', 'door', 'double', 'doubt', 'down', 'draft',
  'drag', 'drama', 'dramatic', 'dramatically', 'draw', 'drawing', 'dream', 'dress', 'drink',
  'drive', 'driver', 'drop', 'drug', 'dry', 'due', 'during', 'dust', 'duty',
  // E
  'each', 'eager', 'ear', 'early', 'earn', 'earnings', 'earth', 'ease', 'easily', 'east',
  'eastern', 'easy', 'eat', 'economic', 'economics', 'economist', 'economy', 'edge', 'edition',
  'editor', 'educate', 'education', 'educational', 'educator', 'effect', 'effective', 'effectively',
  'efficiency', 'efficient', 'effort', 'egg', 'eight', 'either', 'elderly', 'elect', 'election',
  'electric', 'electricity', 'electronic', 'element', 'elementary', 'eliminate', 'elite', 'else',
  'elsewhere', 'email', 'emails', 'embrace', 'emerge', 'emergency', 'emission', 'emotion',
  'emotional', 'emphasis', 'emphasize', 'employ', 'employee', 'employer', 'employment', 'empty',
  'enable', 'encounter', 'encourage', 'end', 'enemy', 'energy', 'enforcement', 'engage',
  'engine', 'engineer', 'engineering', 'english', 'enhance', 'enjoy', 'enormous', 'enough',
  'ensure', 'enter', 'enterprise', 'entertainment', 'entire', 'entirely', 'entrance', 'entry',
  'environment', 'environmental', 'episode', 'equal', 'equally', 'equipment', 'era', 'error',
  'escape', 'especially', 'essay', 'essential', 'essentially', 'establish', 'establishment',
  'estate', 'estimate', 'etc', 'ethics', 'ethnic', 'evaluate', 'evaluation', 'even', 'evening',
  'event', 'eventually', 'ever', 'every', 'everybody', 'everyone', 'everything', 'everywhere',
  'evidence', 'evolution', 'evolve', 'exact', 'exactly', 'examination', 'examine', 'example',
  'exceed', 'excellent', 'except', 'exception', 'exchange', 'exciting', 'executive', 'exercise',
  'exhibit', 'exhibition', 'exist', 'existence', 'existing', 'expand', 'expansion', 'expect',
  'expectation', 'expense', 'expensive', 'experience', 'experienced', 'experiment', 'expert',
  'expertise', 'explain', 'explanation', 'explode', 'explore', 'export', 'expose', 'exposure',
  'express', 'expression', 'extend', 'extension', 'extensive', 'extent', 'external', 'extra',
  'extraordinary', 'extreme', 'extremely', 'eye',
  // F
  'fabric', 'face', 'facilitate', 'facilitated', 'facilitating', 'facility', 'fact', 'factor',
  'factory', 'faculty', 'fade', 'fail', 'failure', 'fair', 'fairly', 'faith', 'fall', 'false',
  'familiar', 'family', 'famous', 'fan', 'fantasy', 'far', 'farm', 'farmer', 'fashion', 'fast',
  'fat', 'fate', 'father', 'fault', 'favor', 'favorite', 'fear', 'feature', 'february', 'federal',
  'fee', 'feed', 'feedback', 'feel', 'feeling', 'fellow', 'female', 'fence', 'few', 'fewer',
  'fiber', 'fiction', 'field', 'fifteen', 'fifth', 'fifty', 'fight', 'fighter', 'fighting',
  'figure', 'file', 'fill', 'film', 'final', 'finally', 'finance', 'financial', 'find', 'finding',
  'fine', 'finger', 'finish', 'finished', 'finishing', 'fire', 'firm', 'first', 'fish', 'fishing',
  'fit', 'fitness', 'five', 'fix', 'flag', 'flame', 'flat', 'flavor', 'flee', 'flesh', 'flight',
  'float', 'floor', 'flow', 'flower', 'fly', 'focus', 'focused', 'focusing', 'folk', 'follow',
  'following', 'food', 'foot', 'football', 'for', 'force', 'foreign', 'forest', 'forever',
  'forget', 'form', 'formal', 'formation', 'former', 'formula', 'forth', 'fortune', 'forward',
  'found', 'foundation', 'founder', 'four', 'fourth', 'frame', 'framework', 'free', 'freedom',
  'freeze', 'frequency', 'frequent', 'frequently', 'fresh', 'friday', 'friend', 'friendly',
  'friendship', 'from', 'front', 'fruit', 'frustration', 'fuel', 'full', 'fully', 'fun',
  'function', 'fund', 'fundamental', 'funding', 'funeral', 'funny', 'furniture', 'further',
  'furthermore', 'future',
  // G
  'gain', 'galaxy', 'gallery', 'game', 'gang', 'gap', 'garage', 'garden', 'garlic', 'gas',
  'gate', 'gather', 'gaze', 'gear', 'gender', 'gene', 'general', 'generally', 'generate',
  'generation', 'generic', 'generous', 'genetic', 'gentleman', 'gently', 'german', 'gesture',
  'get', 'gets', 'getting', 'ghost', 'giant', 'gift', 'gifted', 'girl', 'girlfriend', 'give',
  'given', 'gives', 'giving', 'glad', 'glance', 'glass', 'global', 'glove', 'go', 'goes', 'going',
  'goal', 'goals', 'god', 'gold', 'golden', 'golf', 'good', 'government', 'governor', 'grab',
  'grade', 'gradually', 'graduate', 'grain', 'grand', 'grandfather', 'grandmother', 'grant',
  'grass', 'grave', 'gray', 'great', 'greatest', 'greatly', 'green', 'grocery', 'ground',
  'group', 'grow', 'growing', 'growth', 'guarantee', 'guard', 'guess', 'guest', 'guidance',
  'guide', 'guideline', 'guilty', 'gun', 'guy',
  // H
  'habit', 'habitat', 'hair', 'half', 'hall', 'hand', 'handle', 'handled', 'handling', 'hang',
  'happen', 'happened', 'happening', 'happens', 'happy', 'hard', 'hardly', 'hat', 'hate',
  'have', 'haven\'t', 'having', 'he', 'he\'s', 'head', 'headline', 'headquarters', 'heal',
  'health', 'healthy', 'hear', 'hearing', 'heart', 'heat', 'heaven', 'heavily', 'heavy',
  'height', 'held', 'hell', 'hello', 'help', 'helpful', 'helping', 'helps', 'her', 'here',
  'heritage', 'hero', 'herself', 'hesitate', 'hide', 'high', 'highlight', 'highly', 'highway',
  'hill', 'him', 'himself', 'hip', 'hire', 'his', 'historian', 'historic', 'historical',
  'history', 'hit', 'hold', 'holder', 'holding', 'hole', 'holiday', 'holy', 'home', 'homeless',
  'honest', 'honestly', 'honey', 'honor', 'hope', 'horizon', 'horror', 'horse', 'hospital',
  'host', 'hot', 'hotel', 'hour', 'hours', 'house', 'household', 'housing', 'how', 'however',
  'huge', 'human', 'humor', 'hundred', 'hungry', 'hunter', 'hunting', 'hurt', 'husband',
  'hypothesis',
  // I
  'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'ice', 'idea', 'ideal', 'identification', 'identify',
  'identity', 'ie', 'if', 'ignore', 'ill', 'illegal', 'illness', 'illustrate', 'image',
  'imagination', 'imagine', 'immediate', 'immediately', 'immigrant', 'immigration', 'impact',
  'implement', 'implementation', 'implication', 'imply', 'importance', 'important', 'impose',
  'impossible', 'impress', 'impression', 'impressive', 'improve', 'improved', 'improvement',
  'improving', 'in', 'incentive', 'incident', 'include', 'included', 'includes', 'including',
  'income', 'incorporate', 'increase', 'increased', 'increasing', 'increasingly', 'incredible',
  'indeed', 'independence', 'independent', 'index', 'indicate', 'indication', 'indicator',
  'indigenous', 'individual', 'industrial', 'industry', 'infant', 'infection', 'inflation',
  'influence', 'influential', 'inform', 'information', 'infrastructure', 'ingredient', 'initial',
  'initially', 'initiative', 'injury', 'inner', 'innocent', 'innovation', 'innovative', 'input',
  'inquiry', 'inside', 'insight', 'insist', 'inspect', 'inspector', 'inspiration', 'inspire',
  'install', 'instance', 'instead', 'institution', 'institutional', 'instruction', 'instructor',
  'instrument', 'insurance', 'intellectual', 'intelligence', 'intend', 'intense', 'intensity',
  'intent', 'intention', 'interaction', 'interest', 'interested', 'interesting', 'internal',
  'international', 'internet', 'interpret', 'interpretation', 'intervention', 'interview',
  'into', 'introduce', 'introduction', 'invade', 'invasion', 'invent', 'invest', 'investigate',
  'investigation', 'investigator', 'investment', 'investor', 'invite', 'involve', 'involved',
  'involvement', 'iraqi', 'irish', 'iron', 'islamic', 'island', 'isolate', 'israeli', 'issue',
  'it', 'it\'s', 'italian', 'item', 'its', 'itself',
  // J
  'jacket', 'jail', 'january', 'japanese', 'jeans', 'jewish', 'job', 'join', 'joint', 'joke',
  'journal', 'journalist', 'journey', 'joy', 'judge', 'judgment', 'juice', 'july', 'jump',
  'june', 'junior', 'jury', 'just', 'justice', 'justify',
  // K
  'keep', 'key', 'kick', 'kid', 'kill', 'killer', 'killing', 'kind', 'king', 'kiss', 'kitchen',
  'knee', 'knife', 'knock', 'know', 'knowledge', 'known',
  // L
  'lab', 'label', 'labor', 'laboratory', 'lack', 'lady', 'lake', 'land', 'landscape', 'language',
  'lap', 'large', 'largely', 'last', 'late', 'later', 'latter', 'laugh', 'launch', 'law',
  'lawn', 'lawsuit', 'lawyer', 'lay', 'layer', 'lead', 'leader', 'leadership', 'leading',
  'leaf', 'league', 'lean', 'learn', 'learned', 'learning', 'least', 'leather', 'leave', 'leaves',
  'left', 'leg', 'legacy', 'legal', 'legend', 'legislation', 'legitimate', 'lemon', 'length',
  'less', 'lesson', 'let', 'letter', 'level', 'liability', 'liberal', 'library', 'license',
  'lie', 'life', 'lifestyle', 'lifetime', 'lift', 'light', 'like', 'likely', 'limit', 'limitation',
  'limited', 'line', 'link', 'lip', 'liquid', 'list', 'listen', 'listened', 'listening', 'listener',
  'literary', 'literature', 'little', 'live', 'lively', 'liver', 'living', 'load', 'loan', 'local',
  'locate', 'location', 'lock', 'log', 'logic', 'logical', 'lonely', 'long', 'long-term', 'look',
  'looked', 'looking', 'looks', 'loose', 'lose', 'loss', 'lost', 'lot', 'lots', 'loud', 'love',
  'lovely', 'lover', 'low', 'lower', 'loyal', 'loyalty', 'luck', 'lucky', 'lunch', 'lung',
  // M
  'machine', 'machinery', 'mad', 'magazine', 'magic', 'mail', 'main', 'mainly', 'maintain',
  'maintenance', 'major', 'majority', 'make', 'maker', 'makes', 'making', 'male', 'mall',
  'man', 'manage', 'managed', 'management', 'manager', 'managers', 'managing', 'mandate',
  'manner', 'manufacturer', 'manufacturing', 'many', 'map', 'march', 'margin', 'mark',
  'market', 'marketing', 'marketplace', 'marriage', 'married', 'marry', 'mask', 'mass',
  'massive', 'master', 'match', 'material', 'math', 'matter', 'may', 'maybe', 'mayor', 'me',
  'meal', 'mean', 'meaning', 'meaningful', 'means', 'meant', 'meanwhile', 'measure', 'measurement',
  'meat', 'mechanism', 'media', 'medical', 'medication', 'medicine', 'medium', 'meet', 'meeting',
  'meetings', 'member', 'membership', 'memory', 'mental', 'mention', 'menu', 'merchant', 'mere',
  'merely', 'mess', 'message', 'metal', 'meter', 'method', 'methodology', 'mexican', 'middle',
  'might', 'military', 'milk', 'mill', 'million', 'mind', 'mine', 'mineral', 'minimal',
  'minister', 'minor', 'minority', 'minute', 'minutes', 'miracle', 'mirror', 'miss', 'missed',
  'missing', 'mission', 'mistake', 'mistakes', 'mix', 'mixture', 'mode', 'model', 'moderate',
  'modern', 'modest', 'modify', 'molecule', 'mom', 'moment', 'monday', 'money', 'monitor',
  'month', 'months', 'mood', 'moon', 'moral', 'more', 'moreover', 'morning', 'mortgage',
  'most', 'mostly', 'mother', 'motion', 'motivation', 'motor', 'mount', 'mountain', 'mouse',
  'mouth', 'move', 'movement', 'movie', 'mr', 'mrs', 'ms', 'much', 'multiple', 'murder',
  'muscle', 'museum', 'music', 'musical', 'musician', 'muslim', 'must', 'my', 'myself',
  'mystery', 'myth',
  // N
  'naked', 'name', 'narrative', 'narrow', 'nation', 'national', 'native', 'natural', 'naturally',
  'nature', 'near', 'nearby', 'nearly', 'necessarily', 'necessary', 'neck', 'need', 'needed',
  'needle', 'negative', 'negotiate', 'negotiation', 'neighbor', 'neighborhood', 'neither',
  'nerve', 'nervous', 'nest', 'net', 'network', 'never', 'nevertheless', 'new', 'newly', 'news',
  'newspaper', 'next', 'nice', 'night', 'nine', 'no', 'nobody', 'nod', 'noise', 'nomination',
  'none', 'nonetheless', 'nor', 'normal', 'normally', 'north', 'northern', 'nose', 'not', 'note',
  'notebook', 'nothing', 'notice', 'notion', 'novel', 'november', 'now', 'nowhere', 'nuclear',
  'number', 'numerous', 'nurse', 'nut',
  // O
  'object', 'objective', 'obligation', 'observation', 'observe', 'observer', 'obtain', 'obvious',
  'obviously', 'occasion', 'occasional', 'occasionally', 'occupation', 'occupy', 'occur',
  'ocean', 'october', 'odd', 'odds', 'of', 'off', 'offense', 'offensive', 'offer', 'offered',
  'offering', 'office', 'offices', 'officer', 'official', 'officially', 'often', 'oh', 'oil',
  'ok', 'okay', 'old', 'olympic', 'on', 'once', 'one', 'ongoing', 'onion', 'online', 'only',
  'onto', 'open', 'opening', 'operate', 'operating', 'operation', 'operator', 'opinion',
  'opponent', 'opportunity', 'oppose', 'opposite', 'opposition', 'optimistic', 'option',
  'or', 'orange', 'order', 'ordinary', 'organic', 'organization', 'organize', 'organized',
  'orientation', 'origin', 'original', 'originally', 'other', 'others', 'otherwise', 'ought',
  'our', 'ourselves', 'out', 'outcome', 'outdoor', 'outer', 'outline', 'output', 'outside',
  'outsider', 'outstanding', 'oven', 'over', 'overall', 'overcome', 'overlook', 'overnight',
  'overseas', 'overview', 'owe', 'own', 'owner', 'ownership',
  // P
  'pace', 'pack', 'package', 'page', 'pain', 'painful', 'paint', 'painter', 'painting', 'pair',
  'pale', 'palm', 'pan', 'panel', 'pant', 'paper', 'paragraph', 'parent', 'park', 'parking',
  'part', 'participant', 'participate', 'participation', 'particular', 'particularly', 'partly',
  'partner', 'partnership', 'party', 'pass', 'passage', 'passenger', 'passion', 'past', 'patch',
  'path', 'patient', 'pattern', 'pause', 'pay', 'payment', 'peace', 'peak', 'peer', 'penalty',
  'people', 'pepper', 'per', 'perceive', 'percentage', 'perception', 'perfect', 'perfectely',
  'perform', 'performance', 'perhaps', 'period', 'permanent', 'permission', 'permit', 'person',
  'personal', 'personality', 'personally', 'personnel', 'perspective', 'persuade', 'pet',
  'phase', 'phenomenon', 'philosophy', 'phone', 'photo', 'photograph', 'photographer',
  'photography', 'phrase', 'physical', 'physically', 'physician', 'piano', 'pick', 'picture',
  'picturesque', 'pie', 'piece', 'pile', 'pilot', 'pine', 'pink', 'pipe', 'pitch', 'place',
  'places', 'plan', 'plane', 'planet', 'planner', 'planning', 'plans', 'plant', 'plastic',
  'plate', 'platform', 'play', 'player', 'please', 'pleased', 'pleasure', 'plenty', 'plot',
  'plus', 'pm', 'pocket', 'poem', 'poet', 'poetry', 'point', 'pole', 'police', 'policy',
  'political', 'politically', 'politician', 'politics', 'poll', 'pollution', 'pool', 'poor',
  'pop', 'popular', 'population', 'porch', 'port', 'portion', 'portrait', 'portray', 'pose',
  'position', 'positive', 'possess', 'possession', 'possibility', 'possible', 'possibly',
  'post', 'pot', 'potato', 'potential', 'potentially', 'pound', 'pour', 'poverty', 'powder',
  'power', 'powerful', 'practical', 'practice', 'practiced', 'practicing', 'pray', 'prayer',
  'precisely', 'precision', 'predict', 'prefer', 'preference', 'pregnancy', 'pregnant',
  'preliminary', 'premise', 'preparation', 'prepare', 'prepared', 'prescription', 'presence',
  'present', 'presentation', 'presentations', 'preserve', 'president', 'presidential', 'press',
  'pressure', 'pretend', 'pretty', 'prevent', 'previous', 'previously', 'price', 'pride',
  'priest', 'primarily', 'primary', 'prime', 'principal', 'principle', 'print', 'prior',
  'prioritize', 'prioritized', 'prioritizes', 'prioritizing', 'priority', 'priorities', 'prison',
  'prisoner', 'privacy', 'private', 'probably', 'problem', 'problems', 'procedure', 'proceed',
  'process', 'produce', 'producer', 'product', 'production', 'productive', 'productivity',
  'profession', 'professional', 'professor', 'profile', 'profit', 'program', 'progress',
  'project', 'projects', 'prominent', 'promise', 'promote', 'prompt', 'proof', 'proper',
  'properly', 'property', 'proportion', 'proposal', 'propose', 'proposed', 'prospect',
  'protect', 'protection', 'protein', 'protest', 'proud', 'prove', 'provide', 'provided',
  'provider', 'province', 'provision', 'psychological', 'psychologist', 'psychology', 'public',
  'publication', 'publicly', 'publish', 'publisher', 'pull', 'punishment', 'purchase', 'pure',
  'purpose', 'pursue', 'push', 'put',
  // Q
  'qualify', 'quality', 'quantity', 'quarter', 'quarterback', 'queen', 'question', 'questions',
  'quick', 'quickly', 'quiet', 'quietly', 'quit', 'quite', 'quote',
  // R
  'race', 'racial', 'radical', 'radio', 'rail', 'rain', 'raise', 'raised', 'range', 'rank',
  'rapid', 'rapidly', 'rare', 'rarely', 'rate', 'rather', 'rating', 'ratio', 'raw', 'reach',
  'react', 'reaction', 'read', 'reader', 'reading', 'ready', 'real', 'realistic', 'reality',
  'realize', 'realized', 'really', 'reason', 'reasonable', 'recall', 'receive', 'received',
  'recent', 'recently', 'recipe', 'recognition', 'recognize', 'recommend', 'recommendation',
  'record', 'recording', 'recover', 'recovery', 'recruit', 'red', 'reduce', 'reduction',
  'refer', 'reference', 'reflect', 'reflection', 'reform', 'refugee', 'refuse', 'regard',
  'regarding', 'regardless', 'regime', 'region', 'regional', 'register', 'regular', 'regularly',
  'regulate', 'regulation', 'reinforce', 'reject', 'relate', 'relation', 'relationship',
  'relative', 'relatively', 'relax', 'release', 'relevant', 'relief', 'religion', 'religious',
  'rely', 'remain', 'remaining', 'remarkable', 'remember', 'remind', 'remote', 'remove',
  'repeat', 'repeatedly', 'replace', 'reply', 'report', 'reporter', 'represent', 'representation',
  'representative', 'republican', 'reputation', 'request', 'require', 'requirement',
  'requirements', 'rescue', 'research', 'researcher', 'resemble', 'reservation', 'resident',
  'resist', 'resistance', 'resolution', 'resolve', 'resort', 'resource', 'resources', 'respect',
  'respond', 'response', 'responsibility', 'responsible', 'rest', 'restaurant', 'restore',
  'restriction', 'result', 'results', 'retain', 'retire', 'retirement', 'return', 'reveal',
  'revenue', 'review', 'revolution', 'rhythm', 'rice', 'rich', 'rid', 'ride', 'rider',
  'ridge', 'rifle', 'right', 'rim', 'ring', 'riot', 'rip', 'rise', 'risk', 'river', 'road',
  'rock', 'role', 'roll', 'romantic', 'roof', 'room', 'root', 'rope', 'rose', 'rough',
  'roughly', 'round', 'route', 'routine', 'row', 'rub', 'rule', 'run', 'running', 'rural',
  'rush', 'russian',
  // S
  'sacred', 'sad', 'safe', 'safety', 'sake', 'salad', 'salary', 'sale', 'sales', 'salt',
  'same', 'sample', 'sanction', 'sand', 'satellite', 'satisfaction', 'satisfy', 'saturday',
  'sauce', 'save', 'saving', 'say', 'saying', 'scale', 'scan', 'scandal', 'scared', 'scenario',
  'scene', 'schedule', 'scheduled', 'schedules', 'scheduling', 'scheme', 'scholar', 'scholarship',
  'school', 'science', 'scientific', 'scientist', 'scope', 'score', 'scream', 'screen',
  'script', 'sea', 'search', 'season', 'seat', 'second', 'secret', 'secretary', 'section',
  'sector', 'secure', 'security', 'see', 'seed', 'seek', 'seem', 'seems', 'seemed', 'segment',
  'seize', 'seldom', 'select', 'selection', 'self', 'sell', 'seller', 'seminar', 'senate',
  'senator', 'send', 'senior', 'sense', 'sensitive', 'sentence', 'separate', 'september',
  'sequence', 'series', 'serious', 'seriously', 'serve', 'service', 'session', 'sessions',
  'set', 'setting', 'settle', 'settlement', 'seven', 'several', 'severe', 'sex', 'sexual',
  'shade', 'shadow', 'shake', 'shall', 'shape', 'share', 'sharp', 'she', 'sheet', 'shelf',
  'shell', 'shelter', 'shift', 'shine', 'ship', 'shirt', 'shock', 'shoe', 'shoot', 'shooting',
  'shop', 'shopping', 'shore', 'short', 'shortly', 'shot', 'should', 'shoulder', 'shout',
  'show', 'shower', 'shrug', 'shut', 'sick', 'side', 'sigh', 'sight', 'sign', 'signal',
  'significance', 'significant', 'significantly', 'silence', 'silent', 'silver', 'similar',
  'similarly', 'simple', 'simply', 'simplify', 'simplified', 'since', 'sing', 'singer',
  'single', 'sink', 'sir', 'sister', 'sit', 'site', 'situation', 'situations', 'six', 'size',
  'ski', 'skill', 'skills', 'skin', 'skirt', 'sky', 'slave', 'sleep', 'slice', 'slide',
  'slight', 'slightly', 'slip', 'slow', 'slowly', 'small', 'smart', 'smell', 'smile', 'smoke',
  'smooth', 'snap', 'snow', 'so', 'so-called', 'soccer', 'social', 'society', 'soft', 'software',
  'soil', 'solar', 'soldier', 'solid', 'solution', 'solutions', 'solve', 'some', 'somebody',
  'somehow', 'someone', 'something', 'sometimes', 'somewhat', 'somewhere', 'son', 'song',
  'soon', 'sophisticated', 'sorry', 'sort', 'soul', 'sound', 'soup', 'source', 'south',
  'southern', 'soviet', 'space', 'spanish', 'speak', 'speaker', 'speaking', 'speaks', 'special',
  'specialist', 'species', 'specific', 'specifically', 'specify', 'speech', 'speed', 'spend',
  'spending', 'spin', 'spirit', 'spiritual', 'split', 'spokesman', 'spontaneous', 'sport',
  'spot', 'spread', 'spring', 'square', 'squeeze', 'stability', 'stable', 'staff', 'stage',
  'stair', 'stake', 'stand', 'standard', 'standing', 'star', 'stare', 'start', 'started',
  'starting', 'starts', 'state', 'statement', 'station', 'statistics', 'status', 'stay',
  'steady', 'steal', 'steel', 'step', 'steps', 'stick', 'still', 'stir', 'stock', 'stomach',
  'stone', 'stop', 'storage', 'store', 'storm', 'story', 'straight', 'strange', 'stranger',
  'strategic', 'strategy', 'stream', 'street', 'strength', 'strengthen', 'stress', 'stretch',
  'strike', 'string', 'strip', 'stroke', 'strong', 'strongly', 'structure', 'struggle',
  'student', 'studio', 'study', 'stuff', 'style', 'subject', 'submit', 'succeed', 'success',
  'successful', 'successfully', 'such', 'sudden', 'suddenly', 'sue', 'suffer', 'sufficient',
  'sugar', 'suggest', 'suggestion', 'suggestions', 'suit', 'suitable', 'summer', 'summit',
  'sun', 'super', 'supervisor', 'supervisors', 'supply', 'support', 'supporter', 'suppose',
  'supposed', 'supreme', 'sure', 'surely', 'surface', 'surgery', 'surprise', 'surprised',
  'surprising', 'surprisingly', 'surround', 'survey', 'survival', 'survive', 'survivor',
  'suspect', 'sustain', 'swear', 'sweep', 'sweet', 'swim', 'swing', 'switch', 'symbol',
  'symptom', 'system',
  // T
  'table', 'tablespoon', 'tactic', 'tail', 'take', 'taken', 'takes', 'taking', 'tale', 'talent',
  'talk', 'talked', 'talking', 'tall', 'tank', 'tap', 'tape', 'target', 'task', 'tasks',
  'taste', 'tax', 'taxpayer', 'tea', 'teach', 'teacher', 'teaching', 'team', 'teammate',
  'tear', 'teaspoon', 'technical', 'technique', 'technology', 'teen', 'teenager', 'telephone',
  'telescope', 'television', 'tell', 'temperature', 'temporary', 'ten', 'tend', 'tendency',
  'tennis', 'tension', 'tent', 'term', 'terms', 'terrible', 'territory', 'terror', 'terrorism',
  'terrorist', 'test', 'testify', 'testimony', 'testing', 'text', 'than', 'thank', 'thanks',
  'that', 'the', 'theater', 'their', 'theirs', 'them', 'theme', 'themselves', 'then', 'theory',
  'therapy', 'there', 'therefore', 'these', 'they', 'thick', 'thin', 'thing', 'things',
  'think', 'thinking', 'third', 'thirty', 'this', 'thorough', 'thoroughly', 'those', 'though',
  'thought', 'thousand', 'threat', 'threaten', 'three', 'throat', 'through', 'throughout',
  'throw', 'thus', 'ticket', 'tie', 'tight', 'time', 'timeline', 'timer', 'times', 'tiny',
  'tip', 'tips', 'tire', 'tired', 'tissue', 'title', 'to', 'tobacco', 'today', 'toe', 'together',
  'tomato', 'tomorrow', 'tone', 'tongue', 'tonight', 'too', 'tool', 'tools', 'tooth', 'top',
  'topic', 'toss', 'total', 'totally', 'touch', 'tough', 'tour', 'tourist', 'tournament',
  'toward', 'towards', 'tower', 'town', 'toy', 'trace', 'track', 'trade', 'tradition',
  'traditional', 'traffic', 'tragedy', 'trail', 'train', 'trainer', 'training', 'transfer',
  'transform', 'transformation', 'transition', 'translate', 'translation', 'transportation',
  'travel', 'treat', 'treatment', 'treaty', 'tree', 'tremendous', 'trend', 'trial', 'tribe',
  'trick', 'trip', 'troop', 'trouble', 'truck', 'true', 'truly', 'trust', 'truth', 'try',
  'trying', 'tube', 'tuesday', 'tunnel', 'turn', 'tv', 'twelve', 'twenty', 'twice', 'twin',
  'two', 'type', 'typical', 'typically',
  // U
  'ugly', 'ultimate', 'ultimately', 'unable', 'uncle', 'under', 'undergo', 'understand',
  'understanding', 'understood', 'undertake', 'unemployment', 'unexpected', 'unfair', 'unfold',
  'unfortunately', 'uniform', 'union', 'unique', 'unit', 'united', 'universal', 'universe',
  'university', 'unknown', 'unless', 'unlike', 'unlikely', 'until', 'unusual', 'up', 'upon',
  'upper', 'urban', 'urge', 'urgent', 'us', 'use', 'used', 'useful', 'user', 'uses', 'using',
  'usual', 'usually', 'utility',
  // V
  'vacation', 'valley', 'valuable', 'value', 'variable', 'variation', 'variety', 'various',
  'vary', 'vast', 'vegetable', 'vehicle', 'venture', 'version', 'versus', 'vessel', 'veteran',
  'via', 'victim', 'victory', 'video', 'view', 'viewer', 'village', 'violate', 'violation',
  'violence', 'violent', 'virtual', 'virtually', 'virtue', 'virus', 'visible', 'vision',
  'visit', 'visitor', 'visual', 'vital', 'voice', 'volume', 'volunteer', 'vote', 'voter',
  'vulnerable',
  // W
  'wage', 'wait', 'waiting', 'wake', 'walk', 'wall', 'wander', 'want', 'wanted', 'wants', 'war',
  'warm', 'warn', 'warning', 'wash', 'waste', 'watch', 'watching', 'water', 'wave', 'way', 'ways',
  'we', 'weak', 'weakness', 'wealth', 'wealthy', 'weapon', 'wear', 'weather', 'wedding',
  'wednesday', 'week', 'weekend', 'weekly', 'weight', 'welcome', 'welfare', 'well', 'went',
  'west', 'western', 'wet', 'what', 'whatever', 'wheel', 'when', 'whenever', 'where', 'whereas',
  'wherever', 'whether', 'which', 'while', 'whisper', 'white', 'who', 'whole', 'whom', 'whose',
  'why', 'wide', 'widely', 'widespread', 'wife', 'wild', 'will', 'willing', 'win', 'wind',
  'window', 'wine', 'wing', 'winner', 'winter', 'wipe', 'wire', 'wisdom', 'wise', 'wish',
  'with', 'withdraw', 'within', 'without', 'witness', 'woman', 'wonder', 'wonderful', 'wood',
  'wooden', 'word', 'words', 'work', 'worked', 'worker', 'working', 'workplace', 'works',
  'workshop', 'world', 'worried', 'worry', 'worth', 'would', 'wound', 'wrap', 'write', 'writer',
  'writing', 'written', 'wrong',
  // Y
  'yard', 'yeah', 'year', 'yearly', 'years', 'yell', 'yellow', 'yes', 'yesterday', 'yet',
  'yield', 'you', 'young', 'your', 'yours', 'yourself', 'youth', 'zone'
];

// Build comprehensive fast dictionary set with inflections
const COMMON_DICTIONARY = new Set<string>();

BASE_DICTIONARY.forEach((w) => {
  const clean = w.toLowerCase().trim();
  COMMON_DICTIONARY.add(clean);

  // Auto-inflections
  if (clean.length > 2) {
    COMMON_DICTIONARY.add(clean + 's');
    COMMON_DICTIONARY.add(clean + 'ed');
    COMMON_DICTIONARY.add(clean + 'ing');
    if (clean.endsWith('e')) {
      COMMON_DICTIONARY.add(clean + 'd');
      COMMON_DICTIONARY.add(clean.slice(0, -1) + 'ing');
    }
    if (clean.endsWith('y')) {
      COMMON_DICTIONARY.add(clean.slice(0, -1) + 'ies');
      COMMON_DICTIONARY.add(clean.slice(0, -1) + 'ied');
    }
  }
});

// Explicitly ensure critical irregular verbs and common words are present
[
  'yesterday', 'tomorrow', 'tonight', 'went', 'gone', 'saw', 'seen', 'came', 'come', 'got', 'gotten',
  'met', 'clarified', 'clarifying', 'prioritized', 'collaborated', 'delegated', 'scheduled',
  'attended', 'discussed', 'emailed', 'called', 'explained', 'simplified', 'addressed', 'analyzed',
  'implemented', 'delivered', 'reviewed', 'prepared', 'organized', 'finished', 'completed', 'started'
].forEach((w) => COMMON_DICTIONARY.add(w));

// Levenshtein distance
function levenshtein(a: string, b: string): number {
  const an = a.length;
  const bn = b.length;
  if (an === 0) return bn;
  if (bn === 0) return an;
  const matrix: number[][] = [];
  for (let i = 0; i <= bn; ++i) matrix[i] = [i];
  for (let i = 0; i <= an; ++i) matrix[0][i] = i;

  for (let i = 1; i <= bn; ++i) {
    for (let j = 1; j <= an; ++j) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[bn][an];
}

// Generate valid stem and morphological variations of a target word
export function getWordVariants(word: string): string[] {
  const clean = word.toLowerCase().trim();
  const variants = new Set<string>([clean]);

  if (clean.endsWith('y') && clean.length > 2) {
    const base = clean.slice(0, -1);
    variants.add(base + 'ies'); // clarifies
    variants.add(base + 'ied'); // clarified
    variants.add(clean + 'ing'); // clarifying
  } else if (clean.endsWith('e')) {
    variants.add(clean + 'd'); // prioritized
    variants.add(clean + 's'); // prioritizes
    variants.add(clean.slice(0, -1) + 'ing'); // prioritizing
  } else {
    variants.add(clean + 's');
    variants.add(clean + 'es');
    variants.add(clean + 'ed');
    variants.add(clean + 'ing');
  }

  if (clean.endsWith('ly')) {
    variants.add(clean.slice(0, -2));
  } else {
    variants.add(clean + 'ly');
  }

  // Phrasal verbs
  if (clean.includes(' ')) {
    const [verb, prep] = clean.split(' ');
    variants.add(`${verb}s ${prep}`);
    variants.add(`${verb}ing ${prep}`);
    if (verb === 'catch') {
      variants.add(`caught ${prep}`);
    } else {
      variants.add(`${verb}ed ${prep}`);
    }
  }

  return Array.from(variants);
}

/**
 * Multi-dimensional sentence analysis engine.
 * Distinguishes between:
 *  - 'error': clear grammatical violation or missing target vocabulary
 *  - 'suggestion': natural phrasing, missing articles, or stylistics
 *  - 'alternative': valid alternative wording
 */
function buildProgressiveClue(
  sentence: string,
  targetWord: VocabularyWord,
  feedbackItems: FeedbackItem[],
  attemptNumber: number,
  previousAttemptSentence?: string,
  suggestedCorrection?: string
): ClueInfo {
  const sentenceLower = sentence.toLowerCase();
  const hasPastMarker = /\b(yesterday|last\s+(week|month|year|night|weekend)|days?\s+ago)\b/i.test(sentenceLower);
  const hasDiscussAbout = /\b(discuss)\s+(about)\b/i.test(sentenceLower);
  const hasClarifyAbout = /\b(clarify)\s+(about)\b/i.test(sentenceLower);
  const hasCollaborateTogether = /\b(collaborat(e|ed|es|ing))\s+(together)\b/i.test(sentenceLower);
  const hasToOffice = /\bto\s+office\b/i.test(sentenceLower);
  const hasGoTense = /\b(i|we|they|he|she)\s+go\b/i.test(sentenceLower) && hasPastMarker;
  const hasClarifyTense = (targetWord.word.toLowerCase() === 'clarify' && hasPastMarker && !/\bclarified\b/i.test(sentenceLower));
  const hasGoed = /\bgoed\b/i.test(sentenceLower);
  const hasSubjectAgreement = feedbackItems.some(f => f.message.toLowerCase().includes('subject-verb agreement') || f.message.toLowerCase().includes('third-person'));
  const missingTargetWord = !getWordVariants(targetWord.word).some(v => new RegExp(`\\b${v}\\b`, 'i').test(sentenceLower));

  // Determine what they got right:
  const whatYouGotRight: string[] = [];
  if (!missingTargetWord) {
    whatYouGotRight.push(`You used "${targetWord.word}" in your sentence.`);
  }
  if (sentence.split(/\s+/).length >= 4) {
    whatYouGotRight.push('Good sentence length and conversational intent.');
  }

  // Determine what to fix:
  const whatToFix: string[] = [];

  if (hasCollaborateTogether) {
    whatToFix.push('"Collaborate" already includes the idea of working together, so "collaborate together" is redundant.');
  }

  if (hasDiscussAbout) {
    whatToFix.push('In English, "discuss" takes the topic directly without the preposition "about".');
  } else if (hasClarifyAbout) {
    whatToFix.push('"Clarify" takes the direct object without "about".');
  }

  if (hasPastMarker && (hasGoTense || hasClarifyTense || hasGoed)) {
    if (hasGoTense && hasClarifyTense) {
      whatToFix.push(`Both "go" and "${targetWord.word.toLowerCase()}" need to match past tense because you said "yesterday".`);
    } else if (hasGoTense) {
      whatToFix.push('"go" should be "went" because you said "yesterday".');
    } else if (hasClarifyTense) {
      whatToFix.push('The sentence refers to a completed past event, so "clarify" should be "clarified".');
    }
  }

  if (hasToOffice) {
    whatToFix.push('Article note: say "to the office" rather than "to office".');
  }

  if (hasSubjectAgreement) {
    whatToFix.push('Check the verb form to ensure it agrees with the subject in number and tense.');
  } else if (missingTargetWord) {
    whatToFix.push(`Include the target word "${targetWord.word}" in your sentence.`);
  } else if (whatToFix.length === 0 && feedbackItems.length > 0) {
    whatToFix.push(feedbackItems[0].message);
  }

  // Attempt 1: Conceptual Clue (Discovery)
  if (attemptNumber <= 1) {
    let hint = '';
    if (hasCollaborateTogether) {
      hint = "Which word can you remove while keeping the meaning?";
    } else if (hasPastMarker && (hasGoTense || hasClarifyTense || hasGoed)) {
      hint = "Think about the time expression 'yesterday'. Should the verb be in the present or past tense?";
    } else if (hasDiscussAbout) {
      hint = "With 'discuss', do you need 'about' before the topic?";
    } else if (hasClarifyAbout) {
      hint = "Does 'clarify' need 'about' before the issue, or does it take the topic directly?";
    } else if (missingTargetWord) {
      hint = `Try weaving "${targetWord.word}" into your sentence to express a clear action or request.`;
    } else if (hasSubjectAgreement) {
      hint = "Notice the subject of your sentence. What ending does the verb need in the present tense?";
    } else if (feedbackItems.length > 0) {
      hint = feedbackItems[0].ruleExplanation || feedbackItems[0].message;
    } else {
      hint = "Check the sentence flow and verify that all verb forms match your intended time frame.";
    }

    return {
      level: 1,
      title: '💡 Clue',
      hint,
      whatYouGotRight: whatYouGotRight.length > 0 ? whatYouGotRight : undefined,
      whatToFix: whatToFix.length > 0 ? whatToFix : undefined
    };
  }

  // Attempt 2: Stronger Guided Clue
  if (attemptNumber === 2) {
    let hint = '';
    const prevLower = previousAttemptSentence ? previousAttemptSentence.toLowerCase() : '';
    const fixedGo = prevLower.includes('i go') && sentenceLower.includes('i went');

    if (hasCollaborateTogether) {
      hint = "Which word could you remove without changing the meaning? Remove 'together' after 'collaborate': say 'collaborate with the team'.";
    } else if (fixedGo && hasClarifyTense) {
      hint = `Good — you fixed 'go → went'. There is one more verb that needs to be in the past tense: ${targetWord.word.toLowerCase()} → ?`;
    } else if (hasPastMarker && (hasGoTense || hasClarifyTense)) {
      hint = `Change the verbs to past tense: "go" becomes "went", and "${targetWord.word.toLowerCase()}" becomes "${targetWord.word.toLowerCase()}ed". Also say "to the office".`;
    } else if (hasDiscussAbout) {
      hint = 'In English, "discuss" is a transitive verb that connects directly to the object: say "discuss the [topic]", without "about".';
    } else if (hasClarifyAbout) {
      hint = 'In English, "clarify" takes the object directly: say "clarify the [issue]", without "about".';
    } else if (missingTargetWord) {
      hint = `Form a sentence starting with "I need to ${targetWord.word.toLowerCase()}..." or "Could you ${targetWord.word.toLowerCase()}...?"`;
    } else if (hasSubjectAgreement) {
      hint = 'Singular subjects (he, she, manager) take verbs ending in "-s" or "-es" in the present tense.';
    } else {
      hint = feedbackItems[0]?.message || 'Adjust the sentence to ensure verbs and prepositions are standard.';
    }

    return {
      level: 2,
      title: '💡 Guided Clue',
      hint,
      whatYouGotRight: whatYouGotRight.length > 0 ? whatYouGotRight : undefined,
      whatToFix: whatToFix.length > 0 ? whatToFix : undefined
    };
  }

  // Attempt >= 3: Model Answer & Explanation
  return {
    level: 3,
    title: '💡 Complete Answer & Explanation',
    hint: suggestedCorrection
      ? `Use:\n"${suggestedCorrection}"\n\nRepeat this complete sentence aloud to build muscle memory.`
      : `Use "${targetWord.example1}". Repeat it aloud to practice the structure.`,
    whatYouGotRight: whatYouGotRight.length > 0 ? whatYouGotRight : undefined,
    whatToFix: whatToFix.length > 0 ? whatToFix : undefined
  };
}

export function evaluateSentence(
  rawInput: string,
  targetWord: VocabularyWord,
  inputMethod: 'voice' | 'text' = 'voice',
  practiceMode: 'open' | 'situation' = 'open',
  situationPrompt?: string,
  previousAttemptSentence?: string,
  attemptNumber: number = 1
): FeedbackEvaluation {
  const sentence = rawInput.trim();
  const feedbackItems: FeedbackItem[] = [];
  const praise: string[] = [];
  const issues: string[] = [];

  // Short/Empty Input check
  if (!sentence || sentence.split(/\s+/).length < 2) {
    const defaultCorrection = targetWord.example1;
    return {
      learningStatus: 'needs_another_try',
      rating: 'Try again',
      headline: 'Sentence is too brief or empty',
      coachLesson: `Coach Says: Speak a complete thought containing "${targetWord.word}" so we can practice together.`,
      usedTargetWord: false,
      attemptNumber,
      clue: {
        level: 1,
        title: '💡 Clue',
        hint: `Try forming a full sentence with a subject and action using "${targetWord.word}". For example: "Could you ${targetWord.word.toLowerCase()} this for me?"`,
        whatToFix: [`Please provide a full sentence of at least 4-5 words using "${targetWord.word}".`]
      },
      scoreBreakdown: {
        targetWord: 0,
        grammar: 1.0,
        structure: 0.5,
        naturalness: 0.5,
        pronunciation: 0.0
      },
      dimensions: {
        vocabularyUsage: { status: 'fail', score: 0, message: `Include the word "${targetWord.word}" in your sentence.` },
        grammar: { status: 'warning', score: 1.0, message: 'Please provide more words to analyze sentence structure.' },
        spelling: { status: 'pass', score: 2.0, message: 'No errors detected.' },
        completeness: { status: 'fail', score: 0.5, message: 'Please speak or write a full sentence.' },
        naturalness: { status: 'warning', score: 0.5, message: 'A complete sentence has a subject and action.' }
      },
      feedbackItems: [
        {
          severity: 'error',
          category: 'structure',
          message: `Please form a full sentence of at least 4-5 words using "${targetWord.word}".`
        }
      ],
      issues: [`Please provide a full sentence using "${targetWord.word}".`],
      praise: [],
      suggestedCorrection: defaultCorrection,
      explanation: 'To practice effectively, express a complete thought with a subject and action.'
    };
  }

  const sentenceLower = sentence.toLowerCase();

  // Remove punctuation while preserving internal apostrophes in contractions/possessives (e.g. don't, can't, manager's)
  const cleanSentence = sentence
    .replace(/[.,!?;:\"()\[\]{}]/g, ' ')
    .replace(/\s+'|'\s+/g, ' ') // outer quotation marks
    .toLowerCase();
  const rawWords = cleanSentence
    .split(/\s+/)
    .map(w => w.replace(/^'+|'+$/g, ''))
    .filter(Boolean);

  // -------------------------------------------------------------
  // 1. TARGET VOCABULARY ANALYSIS
  // -------------------------------------------------------------
  const detectedCorrectionsMap = new Map<string, string>();
  const targetVariants = getWordVariants(targetWord.word);
  let matchedVariant: string | null = null;

  for (const variant of targetVariants) {
    const regex = new RegExp(`\\b${variant.replace(' ', '\\s+')}\\b`, 'i');
    if (regex.test(sentenceLower)) {
      matchedVariant = variant;
      break;
    }
  }

  const usedTargetWord = matchedVariant !== null;
  let targetWordScore = usedTargetWord ? 2.5 : 0;
  let targetWordStatus: 'pass' | 'warning' | 'fail' = usedTargetWord ? 'pass' : 'fail';
  let targetWordMsg = '';

  if (usedTargetWord) {
    targetWordMsg = `Accurately used "${targetWord.word}" (as "${matchedVariant}").`;
    praise.push(`Accurately included the target word "${targetWord.word}".`);
  } else {
    // Check if slight typo of the target word exists
    let typoCandidate: string | null = null;
    for (const w of rawWords) {
      if (w.length >= 4 && levenshtein(w, targetWord.word.toLowerCase()) <= 2) {
        typoCandidate = w;
        break;
      }
    }

    if (typoCandidate) {
      targetWordStatus = 'warning';
      targetWordScore = 1.0;
      targetWordMsg = `Close! You wrote "${typoCandidate}", which appears to be a typo of "${targetWord.word}".`;
      feedbackItems.push({
        severity: 'error',
        category: 'vocabulary',
        message: `Spell the target word correctly: write "${targetWord.word}" instead of "${typoCandidate}".`,
        originalSnippet: typoCandidate,
        correctedSnippet: targetWord.word
      });
      issues.push(`Target word spelling: use "${targetWord.word}" instead of "${typoCandidate}".`);
    } else {
      targetWordStatus = 'fail';
      targetWordScore = 0;
      targetWordMsg = `The target vocabulary word "${targetWord.word}" was not found.`;
      feedbackItems.push({
        severity: 'error',
        category: 'vocabulary',
        message: `Make sure to include "${targetWord.word}" or one of its natural forms.`
      });
      issues.push(`Missing target word "${targetWord.word}".`);
    }
  }

  // Check Common Pitfalls & Redundancies specific to Target Word
  if (/\b(collaborat(e|ed|es|ing))\s+(together)\b/i.test(sentenceLower)) {
    targetWordStatus = 'warning';
    targetWordMsg = '"Collaborate" already includes the idea of working together, making "collaborate together" redundant.';
    feedbackItems.push({
      severity: 'error',
      category: 'vocabulary',
      message: '"Collaborate" already means working together, so "collaborate together" is redundant. Say "collaborate with the design team" instead.',
      originalSnippet: 'collaborate together',
      correctedSnippet: 'collaborate',
      ruleExplanation: '"Collaborate" contains the concept of working together. Saying "collaborate together" is redundant.'
    });
    issues.push('Avoid redundancy: say "collaborate with", not "collaborate together".');
    detectedCorrectionsMap.set('\\bcollaborate\\s+together\\b', 'collaborate');
    detectedCorrectionsMap.set('\\bcollaborates\\s+together\\b', 'collaborates');
    detectedCorrectionsMap.set('\\bcollaborated\\s+together\\b', 'collaborated');
    detectedCorrectionsMap.set('\\bcollaborating\\s+together\\b', 'collaborating');
  }

  // Check if target word card defines commonMistakes
  if (targetWord.commonMistakes && targetWord.commonMistakes.length > 0) {
    for (const mistakeStr of targetWord.commonMistakes) {
      const match = mistakeStr.match(/❌\s*"([^"]+)"\s*→\s*(?:✅\s*)?([^\n\r.]+)/i);
      if (match) {
        const badPhrase = match[1].trim().toLowerCase();
        const goodHint = match[2].trim();
        const badRegex = new RegExp(`\\b${badPhrase.replace(/\s+/g, '\\s+')}\\b`, 'i');
        if (badRegex.test(sentenceLower)) {
          if (!feedbackItems.some(f => f.originalSnippet?.toLowerCase() === badPhrase)) {
            feedbackItems.push({
              severity: 'error',
              category: 'vocabulary',
              message: `Common pitfall: avoid "${match[1]}". ${goodHint}.`,
              originalSnippet: match[1],
              ruleExplanation: `Vocabulary rule for "${targetWord.word}": ${mistakeStr.replace(/^[❌✅\s]+/, '')}`
            });
            issues.push(`Avoid pitfall: "${match[1]}".`);
            targetWordStatus = 'warning';
            targetWordMsg = `Avoid common pitfall "${match[1]}".`;
          }
        }
      }
    }
  }

  // -------------------------------------------------------------
  // 2. SPELLING & TRANSCRIPTION CHECK (NO FALSE POSITIVES)
  // -------------------------------------------------------------
  const validWordsSet = new Set([...COMMON_DICTIONARY, ...targetVariants]);
  const flaggedSpelling: { word: string; suggestion?: string }[] = [];

  // Ignore numbers, common proper nouns, single letters like 'a' or 'i', and irregular error tokens handled by grammar
  for (const w of rawWords) {
    if (w.length <= 2 || /^\d+$/.test(w)) continue;
    if (w === 'yesterday' || w === 'manager' || w === 'office' || w === 'clarify' || w === 'goed') continue;

    // Check standard dictionary and contractions
    if (validWordsSet.has(w)) continue;
    // Check possessives (e.g., client's, manager's)
    if (w.endsWith("'s") && validWordsSet.has(w.slice(0, -2))) continue;
    // Check negative contractions with apostrophe (didn't, don't, can't, etc.)
    if (w.endsWith("n't")) {
      const base = w.slice(0, -3);
      if (
        validWordsSet.has(base) ||
        ['did', 'do', 'does', 'ca', 'wo', 'could', 'should', 'would', 'is', 'are', 'was', 'were', 'has', 'have', 'had'].includes(base)
      ) {
        continue;
      }
    }
    // Check regular plurals
    if (w.endsWith('s') && validWordsSet.has(w.slice(0, -1))) continue;
    if (w.endsWith('es') && validWordsSet.has(w.slice(0, -2))) continue;
    if (w.endsWith('ies') && validWordsSet.has(w.slice(0, -3) + 'y')) continue;
    // Check regular past tense forms ending in -ed
    if (w.endsWith('ed') && (validWordsSet.has(w.slice(0, -2)) || validWordsSet.has(w.slice(0, -1)))) continue;
    // Check gerund forms ending in -ing
    if (w.endsWith('ing') && (validWordsSet.has(w.slice(0, -3)) || validWordsSet.has(w.slice(0, -3) + 'e'))) continue;

    // Find closest word with distance 1 or 2
    let closest: string | undefined;
    let minDistance = 3;
    for (const dictWord of validWordsSet) {
      if (Math.abs(dictWord.length - w.length) > 2) continue;
      const d = levenshtein(w, dictWord);
      if (d < minDistance) {
        minDistance = d;
        closest = dictWord;
      }
    }

    if (closest && minDistance <= 2) {
      flaggedSpelling.push({ word: w, suggestion: closest });
    }
  }

  let spellingScore = 2.0;
  let spellingStatus: 'pass' | 'warning' | 'fail' = 'pass';
  let spellingMsg = 'All words are spelled accurately.';

  if (flaggedSpelling.length > 0) {
    spellingStatus = flaggedSpelling.length > 2 ? 'fail' : 'warning';
    spellingScore = Math.max(0.5, 2.0 - flaggedSpelling.length * 0.7);
    const details = flaggedSpelling
      .map(m => (m.suggestion ? `"${m.word}" (did you mean "${m.suggestion}"?)` : `"${m.word}"`))
      .join(', ');
    spellingMsg = `Possible spelling check: ${details}.`;
    flaggedSpelling.forEach(m => {
      feedbackItems.push({
        severity: 'suggestion',
        category: 'spelling',
        message: m.suggestion ? `Check spelling of "${m.word}"; perhaps you intended "${m.suggestion}".` : `Uncommon word: "${m.word}".`,
        originalSnippet: m.word,
        correctedSnippet: m.suggestion
      });
    });
    issues.push(`Spelling note: ${details}`);
  } else {
    praise.push('Spelling and word recognition are clean.');
  }

  // -------------------------------------------------------------
  // 3. SENTENCE-WIDE GRAMMAR ANALYSIS
  // -------------------------------------------------------------
  let grammarScore = 2.5;
  let grammarStatus: 'pass' | 'warning' | 'fail' = 'pass';

  // A. Past tense time anchor checks (e.g., "yesterday", "last week", "days ago")
  const pastMarkers = /\b(yesterday|last\s+(week|month|year|night|weekend)|days?\s+ago|in\s+(19\d\d|20\d\d))\b/i;
  const hasPastMarker = pastMarkers.test(sentenceLower);

  if (hasPastMarker) {
    // Check irregular "goed"
    if (/\bgoed\b/i.test(sentenceLower)) {
      grammarScore -= 0.8;
      feedbackItems.push({
        severity: 'error',
        category: 'grammar',
        message: 'Irregular past tense: "goed" is incorrect. "Go" is an irregular verb with past form "went" (not "goed").',
        originalSnippet: 'goed',
        correctedSnippet: 'went',
        ruleExplanation: '"Go" is an irregular verb; its simple past form is "went".'
      });
      issues.push('Irregular past tense: use "went" instead of "goed".');
      detectedCorrectionsMap.set('\\bgoed\\b', 'went');
    }

    // Check "I go" -> "I went"
    if (/\b(i|we|they|he|she)\s+go\b/i.test(sentenceLower)) {
      grammarScore -= 0.8;
      feedbackItems.push({
        severity: 'error',
        category: 'grammar',
        message: 'Past tense required: when talking about the past ("yesterday"), say "I went" instead of "I go".',
        originalSnippet: 'I go',
        correctedSnippet: 'I went',
        ruleExplanation: 'Events completed in the past with explicit time markers (yesterday, last week) require Simple Past tense.'
      });
      issues.push('Past tense: use "went" instead of "go" with "yesterday".');
      detectedCorrectionsMap.set('\\bI go\\b', 'I went');
      detectedCorrectionsMap.set('\\bi go\\b', 'I went');
    }

    // Check present continuous with past marker: "I am working on the project yesterday"
    if (/\b(i\s+am|he\s+is|she\s+is|we\s+are|they\s+are|you\s+are)\s+([a-z]+ing)\b/i.test(sentenceLower)) {
      grammarScore -= 0.8;
      const match = sentenceLower.match(/\b(i\s+am|he\s+is|she\s+is|we\s+are|they\s+are|you\s+are)\s+([a-z]+ing)\b/i);
      const aux = match ? match[1] : 'am';
      const ingVerb = match ? match[2] : 'working';
      const pastAux = aux.includes('i') || aux.includes('he') || aux.includes('she') ? 'was' : 'were';
      feedbackItems.push({
        severity: 'error',
        category: 'grammar',
        message: `Tense mismatch: present continuous ("${aux} ${ingVerb}") cannot be used with past time marker "yesterday". Use past continuous ("${pastAux} ${ingVerb}") or simple past.`,
        originalSnippet: `${aux} ${ingVerb}`,
        correctedSnippet: `${pastAux} ${ingVerb}`,
        ruleExplanation: 'Actions in the past require past tenses, not present continuous.'
      });
      issues.push(`Tense mismatch: say "${pastAux} ${ingVerb}" instead of "${aux} ${ingVerb}" with yesterday.`);
      detectedCorrectionsMap.set(`\\b${aux}\\b`, pastAux);
    }

    // Check third-person or subjects with base verb in past context: "The manager clarify the requirements yesterday"
    if (/\b(the\s+manager|the\s+boss|my\s+manager|he|she|they|we)\s+(clarify|prioritize|collaborate|delegate)\b/i.test(sentenceLower)) {
      grammarScore -= 0.8;
      const baseVerb = targetWord.word.toLowerCase();
      const pastVerb = baseVerb === 'clarify' ? 'clarified' : `${baseVerb}d`;
      feedbackItems.push({
        severity: 'error',
        category: 'grammar',
        message: `Past tense required: when referring to the past ("yesterday"), use "${pastVerb}" instead of "${baseVerb}".`,
        originalSnippet: baseVerb,
        correctedSnippet: pastVerb,
        ruleExplanation: 'Actions completed in the past with time markers require simple past tense.'
      });
      issues.push(`Change "${baseVerb}" to past tense "${pastVerb}" with "yesterday".`);
      detectedCorrectionsMap.set(`\\b${baseVerb}\\b`, pastVerb);
    }

    // Check "and clarify" or present tense verbs coordinated in past context
    if (/\b(went|arrived|attended|spoke|was|were|met)\b.*\band\s+(clarify|prioritize|collaborate|delegate)\b/i.test(sentenceLower)) {
      grammarScore -= 0.7;
      feedbackItems.push({
        severity: 'error',
        category: 'grammar',
        message: `Compound past predicate: use the past form ("${targetWord.word.toLowerCase() === 'clarify' ? 'clarified' : 'past form'}") to match the previous past verb.`,
        originalSnippet: matchedVariant || 'clarify',
        correctedSnippet: 'clarified',
        ruleExplanation: 'Verbs joined by "and" in the same time frame must share the same tense.'
      });
      issues.push(`Use past tense "${targetWord.word.toLowerCase() === 'clarify' ? 'clarified' : 'past form'}" to match past tense context.`);
      detectedCorrectionsMap.set('\\bclarify\\b', 'clarified');
    } else if (
      targetWord.partOfSpeech === 'verb' &&
      matchedVariant === targetWord.word.toLowerCase() &&
      !/\b(to|can|will|should|must|did|could|would)\s+clarify\b/i.test(sentenceLower) &&
      !/\b(clarified)\b/i.test(sentenceLower) &&
      !detectedCorrectionsMap.has(`\\b${matchedVariant}\\b`)
    ) {
      // Used base verb with yesterday without modal
      grammarScore -= 0.7;
      const pastForm = targetVariants.find(v => v.endsWith('ed') || v.endsWith('ied') || v === 'caught up') || `${targetWord.word}ed`;
      feedbackItems.push({
        severity: 'error',
        category: 'grammar',
        message: `Past tense alignment: because your sentence refers to the past ("yesterday"), use "${pastForm}" instead of "${matchedVariant}".`,
        originalSnippet: matchedVariant,
        correctedSnippet: pastForm,
        ruleExplanation: 'Specific past time markers call for simple past.'
      });
      issues.push(`Change "${matchedVariant}" to past tense "${pastForm}".`);
      detectedCorrectionsMap.set(`\\b${matchedVariant}\\b`, pastForm);
    }
  }

  // B. Missing article before countable location/event nouns ("go to office" -> "go to the office")
  if (/\b(to|at|in|inside)\s+office\b/i.test(sentenceLower)) {
    grammarScore -= 0.4;
    feedbackItems.push({
      severity: 'suggestion',
      category: 'naturalness',
      message: 'Article note: say "to the office" rather than "to office".',
      originalSnippet: 'to office',
      correctedSnippet: 'to the office',
      ruleExplanation: 'Singular countable places of work generally require the definite article "the".'
    });
    issues.push('Add "the" before "office": say "to the office".');
    detectedCorrectionsMap.set('\\bto office\\b', 'to the office');
    detectedCorrectionsMap.set('\\bat office\\b', 'at the office');
  }

  if (/\b(have|had|in|at|attended)\s+(meeting|presentation|deadline|conference|interview)\b/i.test(sentenceLower)) {
    grammarScore -= 0.4;
    feedbackItems.push({
      severity: 'suggestion',
      category: 'naturalness',
      message: 'Missing article: add "a" or "the" before singular countable nouns (e.g., "had a meeting").',
      ruleExplanation: 'Singular countable nouns cannot stand alone without a determiner (a/an/the).'
    });
    issues.push('Add an article ("a" or "the") before singular nouns like "meeting".');
    detectedCorrectionsMap.set('\\bhad meeting\\b', 'had a meeting');
    detectedCorrectionsMap.set('\\bhave meeting\\b', 'have a meeting');
    detectedCorrectionsMap.set('\\battended meeting\\b', 'attended a meeting');
  }

  // C. Third person subject-verb agreement in PRESENT tense ("he clarify" -> "he clarifies")
  // Note: Only checked when NOT in past tense context
  if (!hasPastMarker && /\b(he|she|it|manager|boss|colleague)\s+(clarify|prioritize|collaborate|delegate|facilitate)\b/i.test(sentenceLower)) {
    grammarScore -= 0.8;
    feedbackItems.push({
      severity: 'error',
      category: 'grammar',
      message: 'Subject-verb agreement: third-person singular subjects (he/she/it/manager) need "-s" or "-es" in present tense.',
      ruleExplanation: 'Third person singular subjects require s-inflection in simple present.'
    });
    issues.push('Subject-verb agreement: add "-s" or "-es" with he/she/manager in present tense.');
  }

  // D. Subject agreement with 'I' or plurals
  if (/\b(i)\s+(is|are|were)\b/i.test(sentenceLower)) {
    grammarScore -= 0.8;
    feedbackItems.push({
      severity: 'error',
      category: 'grammar',
      message: 'Incorrect auxiliary: use "am" or "was" with subject "I".'
    });
    issues.push('Subject agreement: use "I am" or "I was".');
  }

  // E. Preposition errors (e.g. "clarify about", "discuss about", "depend of")
  if (/\b(clarify)\s+(about)\b/i.test(sentenceLower)) {
    grammarScore -= 0.6;
    feedbackItems.push({
      severity: 'error',
      category: 'vocabulary',
      message: '"Clarify" takes a direct object without "about": say "clarify the problem" instead of "clarify about the problem".',
      originalSnippet: 'clarify about',
      correctedSnippet: 'clarify',
      ruleExplanation: '"Clarify" is transitive and connects directly to the noun without "about".'
    });
    issues.push('Usage tip: say "clarify the issue", not "clarify about".');
    detectedCorrectionsMap.set('\\bclarify about\\b', 'clarify');
  }

  if (/\b(discuss)\s+(about)\b/i.test(sentenceLower)) {
    grammarScore -= 0.6;
    feedbackItems.push({
      severity: 'error',
      category: 'vocabulary',
      message: '"Discuss" already means "talk about". Say "discuss the issue" rather than "discuss about".',
      originalSnippet: 'discuss about',
      correctedSnippet: 'discuss',
      ruleExplanation: '"Discuss" is a transitive verb that includes the meaning of "talk about". Saying "discuss about" is incorrect.'
    });
    issues.push('Natural phrasing: say "discuss the problem", not "discuss about".');
    detectedCorrectionsMap.set('\\bdiscuss about\\b', 'discuss');
  }

  if (/\b(depend)\s+(of)\b/i.test(sentenceLower)) {
    grammarScore -= 0.5;
    feedbackItems.push({
      severity: 'error',
      category: 'grammar',
      message: 'Preposition error: say "depend on" instead of "depend of".',
      originalSnippet: 'depend of',
      correctedSnippet: 'depend on'
    });
    issues.push('Preposition note: say "depend on".');
    detectedCorrectionsMap.set('\\bdepend of\\b', 'depend on');
  }

  // F. Modal auxiliary errors (e.g. "must to", "can clarifies")
  if (/\b(can|could|will|would|must|should|may|might)\s+to\s+[a-z]+/i.test(sentenceLower)) {
    grammarScore -= 0.8;
    feedbackItems.push({
      severity: 'error',
      category: 'grammar',
      message: 'Do not use "to" directly after modal verbs like can, must, should, or will.'
    });
    issues.push('Modal syntax: use base verb directly after can/must/should (no "to").');
  }

  grammarScore = Math.max(0.5, Math.min(2.5, grammarScore));
  grammarStatus = grammarScore >= 2.1 ? 'pass' : grammarScore >= 1.4 ? 'warning' : 'fail';
  const grammarMsg =
    grammarStatus === 'pass'
      ? 'Grammar and tense agreements are sound.'
      : issues.find(i => i.toLowerCase().includes('past') || i.toLowerCase().includes('subject')) ||
        'Refinements needed in verb tense or sentence agreement.';

  if (grammarStatus === 'pass') {
    praise.push('Good grammatical structure and verb agreements.');
  }

  // -------------------------------------------------------------
  // 4. SENTENCE STRUCTURE & CLARITY ANALYSIS
  // -------------------------------------------------------------
  const wordCount = rawWords.length;
  let structureScore = 2.0;
  let structureStatus: 'pass' | 'warning' | 'fail' = 'pass';
  let structureMsg = 'Sentence is clear and well-formed.';

  if (wordCount < 4) {
    structureScore = 1.0;
    structureStatus = 'warning';
    structureMsg = 'Sentence is quite short. Expand with more context.';
    feedbackItems.push({
      severity: 'suggestion',
      category: 'structure',
      message: 'Try expanding your thought with who, when, or why for deeper speaking practice.'
    });
    issues.push('Provide more context to make your thought complete.');
  } else if (wordCount >= 6) {
    praise.push('Great sentence length with natural conversational context.');
  }

  // -------------------------------------------------------------
  // 5. NATURALNESS & COLLOCATION
  // -------------------------------------------------------------
  let naturalnessScore = 1.5;
  let naturalnessStatus: 'pass' | 'warning' | 'fail' = 'pass';

  // Check positive collocations
  const targetLower = targetWord.word.toLowerCase();
  if (targetLower === 'clarify' && /\b(clarif(y|ied|ies|ying))\s+(the\s+)?(requirements?|issue|problem|situation|details?|doubt|question)\b/i.test(sentenceLower)) {
    praise.push('Authentic professional collocation ("clarify the problem/requirements").');
  } else if (targetLower === 'deadline' && /\b(meet|miss|extend|push back)\s+(the\s+)?deadline\b/i.test(sentenceLower)) {
    praise.push('Natural native collocation ("meet the deadline").');
  } else if (targetLower === 'prioritize' && /\b(prioritiz(e|ed|ing))\s+(urgent|critical|tasks?|quality|customer)\b/i.test(sentenceLower)) {
    praise.push('Strong professional usage ("prioritize urgent tasks").');
  }

  // Check if multiple suggestions exist
  const suggestionsCount = feedbackItems.filter(f => f.severity === 'suggestion').length;
  if (suggestionsCount > 0) {
    naturalnessScore = Math.max(0.7, 1.5 - suggestionsCount * 0.4);
    naturalnessStatus = naturalnessScore >= 1.2 ? 'pass' : 'warning';
  }

  // -------------------------------------------------------------
  // 6. PRONUNCIATION / SPEECH CLARITY (for voice inputs)
  // -------------------------------------------------------------
  let pronunciationScore = 1.5;
  if (inputMethod === 'voice') {
    // If words were transcribed cleanly with high accuracy
    if (flaggedSpelling.length === 0 && usedTargetWord) {
      pronunciationScore = 1.5;
      praise.push('Speech recognition captured your words clearly.');
    } else if (flaggedSpelling.length > 0) {
      pronunciationScore = 1.1;
    }
  }

  // -------------------------------------------------------------
  // 7. REAL-LIFE SITUATION CONTEXT CHECK
  // -------------------------------------------------------------
  let contextStatus: 'pass' | 'warning' | 'fail' = 'pass';
  let contextMsg = 'Matches the intended context.';
  if (situationPrompt && practiceMode === 'situation') {
    const stopWords = new Set([
      'you', 'are', 'in', 'a', 'an', 'the', 'and', 'or', 'to', 'for', 'with', 'on', 'at', 'by',
      'from', 'your', 'them', 'they', 'we', 'i', 'is', 'was', 'be', 'have', 'had', 'has', 'give',
      'gave', 'given', 'ask', 'tell', 'talk', 'say', 'how', 'what', 'when', 'where', 'which',
      'that', 'this', 'their', 'our', 'would', 'could', 'should', 'can'
    ]);
    const targetWordLower = targetWord.word.toLowerCase();
    const targetVariantsLower = targetVariants.map(v => v.toLowerCase());
    const promptKeywords = situationPrompt
      .toLowerCase()
      .replace(/[.,!?;:"'()]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length >= 4 && !stopWords.has(w) && w !== targetWordLower && !targetVariantsLower.includes(w));

    const professionalContextWords = [
      'meeting', 'call', 'project', 'client', 'manager', 'timeline', 'deliverable', 'deliverables',
      'deadline', 'deadlines', 'email', 'team', 'task', 'tasks', 'goal', 'goals', 'schedule',
      'requirement', 'requirements', 'scope', 'work', 'plan', 'priority', 'status', 'update',
      'boss', 'colleague', 'discussion', 'presentation', 'feedback', 'budget', 'proposal',
      'issue', 'problem', 'solution', 'office', 'contract', 'brief', 'review', 'dates', 'kickoff'
    ];

    const sentenceWords = new Set(rawWords);
    const hasScenarioMatch = promptKeywords.some(kw => sentenceWords.has(kw) || new RegExp(`\\b${kw}\\b`, 'i').test(sentenceLower));
    const hasGeneralWorkplaceMatch = professionalContextWords.some(w => sentenceWords.has(w) || new RegExp(`\\b${w}\\b`, 'i').test(sentenceLower));

    if (!hasScenarioMatch && !hasGeneralWorkplaceMatch) {
      contextStatus = 'warning';
      contextMsg = 'Your sentence uses the target word, but does not address the workplace situation scenario.';
      feedbackItems.push({
        severity: 'suggestion',
        category: 'context',
        message: 'Situation relevance: try tailoring your response directly to the scenario prompt.'
      });
      issues.push('Scenario relevance: address the situation prompt in your sentence.');
      naturalnessScore = Math.max(0.5, naturalnessScore - 0.5);
    } else {
      contextStatus = 'pass';
      contextMsg = 'Response responds appropriately to the real-life scenario.';
      praise.push('Relevance: addressed the workplace situation prompt.');
    }
  }

  // -------------------------------------------------------------
  // 8. SCORING COMPUTATION & RATING
  // -------------------------------------------------------------
  const totalScoreRaw =
    targetWordScore + // max 2.5
    grammarScore +    // max 2.5
    structureScore +  // max 2.0
    naturalnessScore + // max 1.5
    pronunciationScore; // max 1.5
  // sum max = 10.0

  let computedScore = Math.max(1.0, Math.min(10.0, Math.round(totalScoreRaw * 10) / 10));

  const hasErrors = feedbackItems.some(f => f.severity === 'error');
  const hasSuggestions = feedbackItems.some(f => f.severity === 'suggestion');

  if (!usedTargetWord) {
    // Missing target word: cap at 5.5 max
    computedScore = Math.min(5.5, computedScore);
  } else if (hasErrors) {
    // Grammar/vocabulary error: cap at 6.8 max ('Almost there' or 'Try again', cannot be 'Good' or 10/10)
    computedScore = Math.min(6.8, computedScore);
  } else if (contextStatus === 'warning') {
    // Irrelevant to situation scenario: cap at 7.8 max (Rating: 'Good')
    computedScore = Math.min(7.8, computedScore);
  } else if (hasSuggestions) {
    // Minor naturalness/article suggestion: cap at 8.8 max
    computedScore = Math.min(8.8, computedScore);
  }

  const overallScore = computedScore;

  // Determine Learning Model Status ('correct' vs 'almost_there' vs 'needs_another_try')
  const hasDiscussAbout = /\b(discuss)\s+(about)\b/i.test(sentenceLower);
  const hasClarifyAbout = /\b(clarify)\s+(about)\b/i.test(sentenceLower);
  const hasCollaborateTogether = /\b(collaborat(e|ed|es|ing))\s+(together)\b/i.test(sentenceLower);
  const hasMeaningfulIssues = feedbackItems.some(f => f.category === 'grammar' || f.category === 'vocabulary');

  let learningStatus: PracticeLearningStatus;
  if (!usedTargetWord || rawWords.length < 3) {
    learningStatus = 'needs_another_try';
  } else if (hasErrors || hasMeaningfulIssues || hasCollaborateTogether || hasDiscussAbout || hasClarifyAbout) {
    learningStatus = 'almost_there';
  } else {
    learningStatus = 'correct';
  }

  let rating: 'Looks good' | 'Good' | 'Almost there' | 'Try again';
  let headline: string;

  if (learningStatus === 'correct') {
    rating = 'Looks good';
    if (previousAttemptSentence && previousAttemptSentence.toLowerCase() !== sentenceLower) {
      if (previousAttemptSentence.toLowerCase().includes('collaborate together')) {
        headline = 'Nice — you fixed the redundant phrasing and used "Collaborate" naturally!';
      } else if (hasPastMarker && (previousAttemptSentence.toLowerCase().includes('go') || previousAttemptSentence.toLowerCase().includes('clarify'))) {
        headline = 'Nice — you fixed both past-tense mistakes.';
      } else if (previousAttemptSentence.toLowerCase().includes('discuss about') || previousAttemptSentence.toLowerCase().includes('clarify about')) {
        headline = 'Nice — you fixed the preposition phrasing.';
      } else {
        headline = `Nice — you fixed the sentence and used "${targetWord.word}" accurately!`;
      }
    } else {
      headline = `Nice! You used "${targetWord.word}" naturally and correctly.`;
    }
  } else if (learningStatus === 'almost_there') {
    rating = 'Almost there';
    if (usedTargetWord) {
      headline = `You used "${targetWord.word}", but there's something to fix.`;
    } else {
      headline = `Almost there! Remember to include "${targetWord.word}".`;
    }
  } else {
    rating = 'Try again';
    headline = `Good attempt! Let's try again with a cleaner sentence structure.`;
  }

  // -------------------------------------------------------------
  // 9. "COACH SAYS" - Compact Single Most Useful Lesson
  // -------------------------------------------------------------
  let coachLesson = '';

  const errorItems = feedbackItems.filter(f => f.severity === 'error');
  const suggestionItems = feedbackItems.filter(f => f.severity === 'suggestion');

  if (hasCollaborateTogether) {
    coachLesson = '"Collaborate" already includes the idea of working together, so "collaborate together" is redundant. Say "collaborate with the design team".';
  } else if (hasDiscussAbout) {
    coachLesson = '"Discuss" already means "talk about". Say "discuss the project" rather than "discuss about".';
  } else if (hasClarifyAbout) {
    coachLesson = '"Clarify" takes the direct object without "about": say "clarify the problem" instead of "clarify about".';
  } else if (hasPastMarker && (sentenceLower.includes('i go') || sentenceLower.includes('and clarify') || !sentenceLower.includes('clarified'))) {
    coachLesson = `When describing past events ("yesterday"), keep all verbs in the past tense: say "I went" and "clarified".`;
  } else if (!usedTargetWord) {
    coachLesson = `Focus on weaving "${targetWord.word}" into a natural sentence with a subject and action.`;
  } else if (errorItems.length > 0) {
    coachLesson = errorItems[0].ruleExplanation || errorItems[0].message;
  } else if (suggestionItems.length > 0) {
    coachLesson = suggestionItems[0].ruleExplanation || suggestionItems[0].message;
  } else {
    coachLesson = `Excellent communication! Your sentence flows naturally with clear vocabulary usage.`;
  }

  // -------------------------------------------------------------
  // 10. CONCISE CORRECTED SENTENCE
  // -------------------------------------------------------------
  let suggestedCorrection: string | undefined;

  // Apply mapped corrections
  let corrected = sentence;

  // Fix detected mappings
  detectedCorrectionsMap.forEach((replacement, pattern) => {
    corrected = corrected.replace(new RegExp(pattern, 'gi'), replacement);
  });

  // Ensure first letter capitalized
  if (corrected.length > 0) {
    corrected = corrected.charAt(0).toUpperCase() + corrected.slice(1);
  }
  // Ensure "I" alone is uppercase
  corrected = corrected.replace(/\bi\b/g, 'I');

  // Comma after starting adverbial (e.g., "Yesterday I went..." -> "Yesterday, I went...")
  if (/^yesterday\s+/i.test(corrected)) {
    corrected = corrected.replace(/^yesterday\s+/i, 'Yesterday, ');
  }

  // Punctuation
  if (!/[.!?]$/.test(corrected)) {
    corrected += '.';
  }

  if (learningStatus === 'correct') {
    suggestedCorrection = corrected;
  } else {
    // Model Phrasing must NEVER show an uncorrected error or repeat the learner's mistake
    const origNorm = sentence.toLowerCase().replace(/[^a-z0-9]/g, '');
    const corrNorm = corrected.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (corrNorm !== origNorm && usedTargetWord) {
      suggestedCorrection = corrected;
    } else {
      suggestedCorrection = targetWord.example1;
    }
  }

  // -------------------------------------------------------------
  // 11. PREVIOUS ATTEMPT COMPARISON (FOR TRY AGAIN)
  // -------------------------------------------------------------
  let previousAttemptComparison: FeedbackEvaluation['previousAttemptComparison'] = undefined;
  if (previousAttemptSentence && previousAttemptSentence !== sentence) {
    const prevLower = previousAttemptSentence.toLowerCase();
    const currLower = sentence.toLowerCase();
    const changesPraise: string[] = [];

    if (prevLower.includes('i go') && currLower.includes('i went')) {
      changesPraise.push('Fixed "I go" to "I went" — excellent past tense correction!');
    }
    if (prevLower.includes('clarify') && !prevLower.includes('clarified') && currLower.includes('clarified')) {
      changesPraise.push('Accurately updated "clarify" to past form "clarified"!');
    }
    if (prevLower.includes('to office') && currLower.includes('to the office')) {
      changesPraise.push('Added "the" before "office" for natural flow!');
    }

    if (changesPraise.length > 0) {
      previousAttemptComparison = {
        improved: true,
        changesPraise
      };
      praise.unshift(...changesPraise);
    }
  }

  const clue =
    learningStatus !== 'correct'
      ? buildProgressiveClue(sentence, targetWord, feedbackItems, attemptNumber, previousAttemptSentence, suggestedCorrection)
      : undefined;

  return {
    learningStatus,
    attemptNumber,
    clue,
    overallScore,
    rating,
    headline,
    coachLesson,
    usedTargetWord,
    targetWordVariantFound: matchedVariant || undefined,
    scoreBreakdown: {
      targetWord: Math.min(10, Math.round((targetWordScore / 2.5) * 100) / 10),
      grammar: Math.min(10, Math.round((grammarScore / 2.5) * 100) / 10),
      structure: Math.min(10, Math.round((structureScore / 2.0) * 100) / 10),
      naturalness: Math.min(10, Math.round((naturalnessScore / 1.5) * 100) / 10),
      pronunciation: Math.min(10, Math.round((pronunciationScore / 1.5) * 100) / 10)
    },
    dimensions: {
      vocabularyUsage: {
        status: targetWordStatus,
        score: targetWordScore,
        message: targetWordMsg
      },
      grammar: {
        status: grammarStatus,
        score: grammarScore,
        message: grammarMsg
      },
      spelling: {
        status: spellingStatus,
        score: spellingScore,
        message: spellingMsg
      },
      completeness: {
        status: structureStatus,
        score: structureScore,
        message: structureMsg
      },
      naturalness: {
        status: naturalnessStatus,
        score: naturalnessScore,
        message: suggestionsCount > 0 ? 'Minor phrasing adjustments suggested.' : 'Natural conversational phrasing.'
      },
      contextFit: {
        status: contextStatus,
        message: contextMsg
      }
    },
    feedbackItems,
    issues,
    praise,
    suggestedCorrection,
    explanation:
      'Language checks evaluate target vocabulary usage, syntax agreements, sentence structure, naturalness, and speech clarity.',
    previousAttemptComparison
  };
}
