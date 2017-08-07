import tags from '../models/tags.model';


/**
 * Get Tags list.
 * @property {number} req.query.skip - Number of tags to be skipped.
 * @property {number} req.query.limit - Limit number of tagss to be returned.
 * @returns {tags[]}
 */
function getList(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  tags.list({ limit, skip })
    .then(tagsList => res.json(tagsList))
    .catch(e => next(e));
}


/**
 * Creates a Tag.
 */
function create(req, res, next){
	const Tags = new tags({
		name : req.body.name
	});
	
	Tags.save()
    .then(savedTag => res.json(savedTag))
    .catch(e => next(e));
}


/**
 * Creates a Tag.
 */
function removeById(req, res, next){
	var id = req.params.id;
	tags.remove({_id: id}, function(err,removedTag){
		if(err){
			return res.status(500).send();
		}else{
			if(!removedTag){
				return res.status(404).send();
			}else{
				return res.json(removedTag);
			}
		}
	});
}

export default {create, getList, removeById};

