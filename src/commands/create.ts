import {
  CacheType, ChatInputCommandInteraction, SlashCommandBuilder,
} from 'discord.js';
import {
  BaseCommand, IBaseCommand
} from '../classes/BaseCommand';

/*
  This is an example interaction command that echoes your message.
 */
export class Command extends BaseCommand implements IBaseCommand {
  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const message = interaction.options.getString('type');

    await interaction.reply('< Creating Channel >');
    const v = await interaction.guild.channels.create({
      'name': interaction.user.id, 'topic': `Ticket for ${interaction.user.tag}
Type: ${message}`
    });
    await interaction.editReply('< Sending Demo Message >');
    v.send(`Example Message for KS Type: ${message}`);

    await interaction.editReply(`< Created Channel <#${v.id}> >
  Creator: <@${interaction.user.id}>/${interaction.user.id}
  Category: ${message}`);
  };
  data = (new SlashCommandBuilder)
    .setName('create')
    .setDescription('Creates le ticket example')
    .addStringOption((option) =>
      option
        .setName('type')
        .setDescription('Le ticket type')
        .setRequired(true)
        .setChoices({
          'name': 'premium',
          'value': 'prem'
        }, {
          'name': 'key',
          'value': 'ks'
        }, {
          'name': 'unknown',
          'value': 'misc'
        }, {
          'name': 'download',
          'value': 'dl'
        }, {
          'name': 'injection',
          'value': 'inj'
        }, {
          'name': 'hardware id',
          'value': 'modal'
        })
    )
    .setDMPermission(false);
};
