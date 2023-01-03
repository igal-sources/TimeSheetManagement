﻿using System.Linq;
using JetBrains.Annotations;

namespace Json.Schema.DataGeneration.Requirements;

[UsedImplicitly]
internal class ConstRequirementsGatherer : IRequirementsGatherer
{
	public void AddRequirements(RequirementsContext context, JsonSchema schema)
	{
		var constKeyword = schema.Keywords?.OfType<ConstKeyword>().FirstOrDefault();
		if (constKeyword != null)
		{
			if (context.Const.HasValue)
				context.HasConflict = true;
			else
				context.Const = constKeyword.Value;
		}
	}
}